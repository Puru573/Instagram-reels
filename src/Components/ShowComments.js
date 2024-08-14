import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import "./Posts.css"

function ShowComments({postData}) {
    const [comments,setComments]=useState(null);

    let arr=[];
    const collectionComment=async()=>{
        for(let i=0;i<postData?.comments?.length;i++){
            let data= await database.comments.doc(postData.comments[i]).get();
             arr.push(data.data())
        }
        setComments(arr);
    }
    useEffect(()=>{
        collectionComment();
    },[postData])
  return (
    <div className='commBox'>
        {
            comments==null ? <CircularProgress/> :
            <div className='showCoomentbox'>
            {
                comments?.map((comment,index)=>(
                    <div className='showComment' key={index}>
                        <Avatar className='avatarimg' src={comment.uProfileImage}/>
                        <p className='commentText'><span>{comment.uName}</span>&nbsp;&nbsp;{comment.text}</p>
                    </div>
                ))
            }

            </div>
        }
    </div>
  )
}

export default ShowComments
