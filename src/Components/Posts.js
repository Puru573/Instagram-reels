import React, { useEffect, useState, useCallback, useContext } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { database } from '../firebase';
import Videos from './Videos';
import Avatar from '@mui/material/Avatar';
import "./Posts.css"
import Like from './Like';
import Comments from './Comments';
import { AuthContext } from '../Context/AuthContext';

function Posts({ userData }) {
  const [posts, setPosts] = useState(null);
  const [CommentPost, setCommentPost] = useState([]);
  const { user } = useContext(AuthContext);

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
  useEffect(() => {
    let parr = [];
    const onsub = database.users.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        parr.push(data)
      })
      if (parr?.length > 0) {
        let publicPost = parr.filter((item) => {
          if (item?.postIds?.length > 0) {
            return item;
          }
        })
        console.log("publicPost", publicPost);
        setCommentPost(publicPost);
      }
     
    })
    return () => { onsub() };

  }, [user]);

  const updatePostData = useCallback((postId, updatedData) => {  //we prevent it from multiple render
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.postId === postId ? updatedData : post))
    );
  }, [])

  const callback = (entries) => {
    entries.forEach((entry) => {
      let ele = entry.target.childNodes[0];
      ele.play().then(() => {
        if (!ele.paused && !entry.isIntersecting) {  //this has to be done because of the async nature of intesrsectionobserver so all videos are playing what we do is if it is still playing and itersection is false the video will become paused and next video starts playing
          ele.pause();
        }
      })
    })
  }

  let observer = new IntersectionObserver(callback, { threshold: 0.6 });
  useEffect(() => {
    const elements = document.querySelectorAll(".videos")
    elements.forEach((element) => {
      observer.observe(element);
    })
    return () => {
      observer.disconnect(); //cleanup
    }

  }, [posts])

  return (
    <div>
      {console.log("commentposttt", CommentPost)}
      {console.log("postsssss", posts)}
      {
        posts === null || userData === null ? <CircularProgress /> :
          <div className="video-container">
            {
              posts?.map((post, index) => (
                <React.Fragment key={index}>
                  {console.log("post",post)}
                  <div className='videos'>
                    <Videos src={post.purl} />
                    <div className='fa'>
                      {
                        CommentPost?.length > 0 && (
                          <>
                            {
                              CommentPost
                              .filter((item) =>item.postIds.includes(post.postId))
                              .map((filteredUser, idx) => (
                                  <React.Fragment key={idx}>
                                    <Avatar alt="Remy Sharp" src={filteredUser.profileUrl} />
                                    <h4>{filteredUser.fullName}</h4>
                                  </React.Fragment>
                              ))
                            }
                          </>
                        )
                      }
                    </div>
                    <Like userData={userData} postData={post} />
                    <Comments userData={userData} postData={post} updatePostData={updatePostData} />
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
