import React, { useEffect, useState } from 'react'
import TextField  from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import "./Posts.css"
import { database } from '../firebase';
import ShowComments from './ShowComments';


function AddComment({userData,postData,updatePostData}) {
    const [text,setText]=useState("");
    const handleText=(e)=>{
        setText(e.target.value);
    }

  const handleClick= async()=>{
    let obj={
      text:text,
      uProfileImage:userData.profileUrl,
      uName:userData.fullName
    }
    let res= await database.comments.add(obj);
    if(res){
      const postref= await database.posts.doc(postData?.postId).get();
      let currentComments = postref.data()?.comments || [];
   
     await database.posts.doc(postData?.postId).update({
        comments: [...currentComments, res.id]
    });
    }
    const postref= await database.posts.doc(postData?.postId).get();
    let currentComments = postref.data()?.comments || [];

    const updatedPostData = { ...postData, comments: currentComments };
    updatePostData(postData.postId, updatedPostData);
    setText("");
  }
  return (
    <div className="addComment">
        <TextField className="resfield" id="filled-basic" label="comment" variant="outlined" size="small" sx={{width:"75%"}} value={text} onChange={handleText}  />
        <Button variant="contained" onClick={handleClick}>Post</Button>

    </div>
  )
}

export default AddComment
