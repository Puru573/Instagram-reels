import React,{useEffect,useState,useCallback} from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../firebase';
import CircularProgress  from '@mui/material/CircularProgress';
import Navbar from './Navbar';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import "./Profile.css"
import Like2 from './Like2';
import AddComment from './AddComment';
import ShowComments from './ShowComments';
import Dialog from '@mui/material/Dialog';


function Profile() {
    const{id}=useParams();
    const [userData,setUserData]=useState(null);
    const [posts,setPosts]=useState(null);

    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };
    useEffect(()=>{
      database.users.doc(id).onSnapshot((snap)=>{
        setUserData(snap.data());
      })
    },[id]);
    const handlePosts= async()=>{
      if(userData!=null){
        let parr=[];
        for(let i=0;i<userData?.postIds?.length;i++){
          let postData= await database.posts.doc(userData.postIds[i]).get();  //only we can see the individual user post
          parr.push({...postData.data(),postId:postData.id});
        }
        setPosts(parr);
      }
    }
    useEffect(()=>{
      handlePosts();
    },[userData])
  
    const updatePostData = useCallback((postId,updatedData)=>{  //we prevent it from multiple render
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.postId === postId ? updatedData : post))
        );
      
  },[]);

  return (
    <>
    {console.log("postsssss",posts)}
    {console.log("userData",userData)}

    {
      posts===null  ||  userData===null ? <CircularProgress/>:
      <>
      <Navbar userData={userData}/>
      <div className='spacer'>
        <div className='container'>
          <div className='upper-part'>
            <div className='profile-img'>
              <img src={userData.profileUrl}/>
            </div>
            <div className='info'>
              <Typography className='infodata' variant="h5">
                Email:{userData.email}
              </Typography>
              <Typography  className='infodata' variant="h6">
                Posts:{userData?.postIds?.length?userData?.postIds?.length: "No post yet"}
                </Typography>
            </div>
          </div>
          <hr style={{width:'100%'}}></hr>
          <div className="profile-videos">
            {
              posts.length===0?
              <div className='profilesec'> <h1> Please upload the Videos </h1></div> :
              posts?.map((post, index) => (
                <React.Fragment key={index}>
                  <div className='videos'>
                    <video  muted="muted" onClick={()=>handleClickOpen(post.pid)}><source src={post.purl}/></video>
                        <Dialog
                            open={open===post.pid}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            fullWidth={true}
                            maxWidth="md"
                        >
                            <div className='modal-container'>
                                <div className='video-modal'>
                                    <video autoPlay={true} muted="muted" controls className='modal-video'><source src={post.purl}/></video>
                                </div>

                                <div className='comment-container'>
                                    <Card className='card1'>
                                        <ShowComments postData={post}/>
                                    </Card>
                                    <Card variant="outlined" className='card2'>
                                        <Typography className="textLike">{post?.likes?.length>0 ? `Liked by ${post?.likes?.length} users` : ""}</Typography>
                                        <div className='comment-tools'>
                                            <Like2 postData={post} userData={userData} updatePostData={updatePostData}/>
                                            <AddComment postData={post} userData={userData} updatePostData={updatePostData}/>
                                        </div>
                                    </Card>

                                </div>

                            </div>
                        </Dialog>
                  </div>
                </React.Fragment>
              ))
            }
          </div>
        </div>
      </div>
      </>
    }
    </>
  )
}

export default Profile
