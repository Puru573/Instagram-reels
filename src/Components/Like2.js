import React, { useState, useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';
function Like2({ userData, postData, updatePostData }) {
    const [Like, setLike] = useState(null);
    useEffect(() => {
        let check = postData.likes.includes(userData.userId) ? true : false;
        setLike(check);
    }, [postData])
    const handleLike = async () => {
        let narr;
        if (Like === true) {
            narr = postData.likes.filter((el) => el != userData.userId)
        }
        else {
            narr = [...postData.likes, userData.userId]

        }
        await database.posts.doc(postData.postId).update({
            likes: narr
        });
        const updatedPostData = { ...postData, likes: narr };
        updatePostData(postData.postId, updatedPostData); // Sync with the parent
    }

    return (
        <div>
            {
                Like != null ?
                    <>
                        {
                            Like == true ? <FavoriteIcon className={"like"} onClick={handleLike} /> : <FavoriteIcon className={" unlike"} onClick={handleLike} />
                        }
                    </>
                    :
                    <></>
            }

        </div>
    )
}

export default Like2
