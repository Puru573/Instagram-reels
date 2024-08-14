import React, { useState } from 'react'
import { Button } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { database, storage } from "../firebase";
import { v4 as uuidv4 } from "uuid"
import "./Posts.css"



function UploadFile({ userData }) {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [msg, setMsg] = useState("");


    const handleChange = async (file) => {
        if (file === null) {
            setErr("please select a file");
            setTimeout(() => {
                setErr("");
            }, 2000)
            return;
        }
        if (file.type != "video/mp4") {
            setErr("please upload a video only");
            setTimeout(() => {
                setErr("");
            }, 2000)
            return;
        }
        if (file.size > 1024 * 1024 * 100) {
            setErr("please select a file size less than 100 mb");
            setTimeout(() => {
                setErr("");
            }, 2000)
            return;
        }
        else {
            try {
                let uid = uuidv4();
                setLoading(true)
                const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
                uploadTask.on("state_changed", fn1, fn2, fn3);
                //progress
                function fn1(snapshot) {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`upload is ${progress} done`);
                }
                //error
                function fn2(error) {
                    setErr(error.message);
                    setTimeout(() => {
                        setErr("")
                    }, 2000);
                    setLoading(false);
                    return;
                }
                //success
                function fn3() {
                    uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
                        console.log(url);
                        let obj = {
                            likes: [],
                            comments: [],
                            pid: uid,
                            purl: url,
                            uname: userData.fullName,
                            pimage: userData.profileUrl,
                            userId: userData.userId,
                            createdAt: database.getTimeStamp()
                        }
                        let res = await database.posts.add(obj);
                        if (res) {
                            try {
                                await database.users.doc(userData.userId).update({
                                    postIds: userData.postIds != null ? [...userData.postIds, res.id] : [res.id]
                                })
                                setLoading(false);
                                setMsg("your video is successfully uploaded");
                                setTimeout(() => {
                                    setMsg("")
                                }, 2000);
                            }
                            catch (error) {
                                setErr(error)
                                setTimeout(() => {
                                    setErr("");
                                }, 2000)
                                setLoading(false);
                            }

                        }

                    })
                }
            }
            catch (error) {
                setErr(error.message)
                setTimeout(() => {
                    setErr("");
                    setLoading(false);
                }, 2000);
            }
        }
    }
    return (
        <div className='uploadStyling'>
            {
                msg != "" ? <Alert severity="success">{msg}</Alert> :
                    err != "" ? <Alert severity="error">{err}</Alert> :
                        <div>
                            <input type="file" accept='video/*' id="upload-input" onChange={(e) => handleChange(e.target.files[0])} className='input' />
                            <label htmlFor="upload-input">
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    component="span"
                                    disabled={loading}
                                >
                                    <MovieIcon />&nbsp;upload video
                                </Button>
                            </label>
                            {loading && <LinearProgress color="secondary" className='loadingbtn' />}
                        </div>


            }

        </div>
    )
}

export default UploadFile
