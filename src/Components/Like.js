import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';
function Like({userData,postData}) {
    const [Like,setLike]=useState(null);
    useEffect(()=>{
        let check=postData?.likes?.includes(userData.userId)?true:false;
        setLike(check);
    },[postData])

    const handleLike=()=>{
        let narr;
        if(Like===true){
            narr=postData?.likes?.filter((el)=>el!=userData.userId)
            database.posts.doc(postData.postId).update({
                likes:narr
            })
            setLike(false);
        } 
        else{
            narr=[...postData?.likes,userData.userId]
            database.posts.doc(postData.postId).update({
                likes:narr
            })
            setLike(true);
        }
    }
  return (
    <div>
        {
            Like !=null ?
            <>
            {
                Like==true ? <FavoriteIcon className={"icon-styling like"} onClick={handleLike}/> : <FavoriteIcon className={"icon-styling unlike"} onClick={handleLike}/>
            }
            </>
            :
            <></>
        }
      
    </div>
  )
}

export default Like
