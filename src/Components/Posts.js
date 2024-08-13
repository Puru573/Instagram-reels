import React, { useEffect, useState,useCallback } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { database } from '../firebase';
import Videos from './Videos';
import Avatar from '@mui/material/Avatar';
import "./Posts.css"
import Like from './Like';
import Comments from './Comments';

function Posts({ userData }) {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    let parr = [];
    const onsub = database.posts.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = { ...doc.data(), postId: doc.id }
        parr.push(data)

      })
      setPosts(parr);
    })
    return () => { onsub() };

  }, []);

  const updatePostData = useCallback((postId,updatedData)=>{  //we prevent it from multiple render
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.postId === postId ? updatedData : post))
    );
},[])

const callback=(entries)=>{
  entries.forEach((entry)=>{
    let ele=entry.target.childNodes[0];
    ele.play().then(()=>{
      if(!ele.paused && !entry.isIntersecting){  //this has to be done because of the async nature of intesrsectionobserver so all videos are playing what we do is if it is still playing and itersection is false the video will become paused and next video starts playing
        ele.pause();
      }
    })
  })
}

let observer=new IntersectionObserver(callback,{threshold:0.6});
useEffect(()=>{
  const elements=document.querySelectorAll(".videos")  
    elements.forEach((element)=>{
      observer.observe(element);
    })
    return()=>{
      observer.disconnect(); //cleanup
    }
  
},[posts])

  return (
    <div>
      {
        posts === null || userData === null ? <CircularProgress /> :
          <div className="video-container">
            {
              posts.map((post, index) => (
                <React.Fragment key={index}>
                  <div className='videos'>
                    <Videos src={post.purl} />
                    <div className='fa'>
                      <Avatar alt="Remy Sharp" src={userData.profileUrl} />
                      <h4>{userData.fullName}</h4>
                    </div>
                    <Like userData={userData} postData={post}/>
                    <Comments userData={userData} postData={post} updatePostData={updatePostData}/>
                  </div>
                </React.Fragment>
              ))
            }
          </div>
      }
    </div>
  )
}

export default Posts
