import React, {useState,useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Button, CardActionArea, CardActions } from '@mui/material';
import insta from '../Assets/Instagram.JPG';
import TextField from '@mui/material/TextField';
import {AuthContext} from "../Context/AuthContext"
import Alert from '@mui/material/Alert';
import { ClassNames } from '@emotion/react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import "./signup.css"
import {useNavigate} from "react-router-dom"
import{database, storage} from "../firebase";
import {Link} from "react-router-dom";

export default function Signup() {
    const useStyles=makeStyles({
        text1:{
            color:"grey",
            textAlign:"center"
        },
        card2:{
            marginTop:"2rem"
        }
    })
    const classes=useStyles();
    const [email,setEmail]=useState("");
    const [password,setPasswrod]=useState("");
    const [name,setName]=useState("");
    const [err,setErr]=useState("");
    const [file,setFile]=useState(null);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const {signup}=useContext(AuthContext);

    const handleClick= async()=>{
        if(file===null){
            setErr("Please upload the profile image first");
            setTimeout(()=>{
                setErr("")
            },2000);
            return;
        } 
        else{
            try{
                setLoading(true)
                let userObj=await signup(email,password);
                let uid=userObj.user.uid;
                const uploadTask=storage.ref(`/users/${uid}/ProfileImage`).put(file);
                uploadTask.on("state_changed",fn1,fn2,fn3);
                //progress
                function fn1(snapshot){
                    let progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                    console.log(`upload is ${progress} done`);
                }
                 //error
                function fn2(error){
                    setErr(error.message);
                    setTimeout(()=>{
                        setErr("")
                    },2000);
                    setLoading(false);
                    return;
                }
                //success
                function fn3(){
                    uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                        console.log(url);
                        database.users.doc(uid).set({
                            email:email,
                            userId:uid,
                            fullName:name,
                            profileUrl:url,
                            createdAt:database.getTimeStamp()
                        })
                    })
                    setLoading(false);
                    navigate("/");
                }
            }
            catch(error){
                setErr(error.message)
                setTimeout(()=>{
                    setErr("");
                    setLoading(false);
                },2000);
            }
        }
    }

    return (
        <div className='signupWrapper'>
            <div className="signup">
                <Card variant='outlined'>
                    <div className="insta-logo">
                        <img src= {insta} alt="Insta-logo" />
                    </div>
                        <CardContent>
                            <Typography  variant="subtitle1" className={classes.text1}>
                                Sign up to see photos and videos of your friend
                            </Typography>
                            {err!="" && <Alert severity="error">{err}</Alert>}
                            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>setPasswrod(e.target.value)}/>
                            <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size="small" value={name} onChange={(e)=> setName(e.target.value)} />
                            <Button size="small" color="secondary" fullWidth={true} variant="outlined" margin="dense" startIcon={<CloudUploadIcon/>}  component="label">   {/*  Either a string to use a HTML element or a component. */}
                            Upload profile image
                            <input type="file" accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])}/>
                        </Button>
                        </CardContent>
                    <CardActions>
                        <Button color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleClick}>
                            sign up
                        </Button>
                    </CardActions>
                    <CardContent>
                    <Typography  variant="subtitle1" className={classes.text1}>
                        By Signing up, you agree to our term,conditions and Cookies policy.
                            </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined" className={classes.card2}>
                <Typography  variant="subtitle1" className={classes.text1} >
                        Have an account? <Link to="/login" style={{textDecoration:"none"}}> login</Link>
                    </Typography>
                </Card>
            </div>
        </div>
    );
}
