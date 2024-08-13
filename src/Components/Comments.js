import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Videos from './Videos';
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import "./Posts.css"
import Like2 from './Like2';
import AddComment from './AddComment';
import ShowComments from './ShowComments';

function Comments({ userData, postData, updatePostData }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  
    return (
        <div>
          
            {

                postData === null || userData === null ? <CircularProgress /> :
                    <>
                        <ChatBubbleIcon className='commentModal' onClick={handleClickOpen} />
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            fullWidth={true}
                            maxWidth="md"
                        >
                            <div className='modal-container'>
                                <div className='video-modal'>
                                    <video autoPlay={true} muted="muted" controls className='modal-video'><source src={postData.purl}/></video>
                                </div>

                                <div className='comment-container'>
                                    <Card className='card1'>
                                        <ShowComments postData={postData}/>
                                    </Card>
                                    <Card variant="outlined" className='card2'>
                                        <Typography className="textLike">{postData?.likes?.length>0 ? `Liked by ${postData?.likes?.length} users` : ""}</Typography>
                                        <div className='comment-tools'>
                                            <Like2 postData={postData} userData={userData} updatePostData={updatePostData}/>
                                            <AddComment postData={postData} userData={userData} updatePostData={updatePostData}/>
                                        </div>
                                    </Card>

                                </div>

                            </div>
                        </Dialog>
                    </>
            }


        </div>
    )
}

export default Comments
