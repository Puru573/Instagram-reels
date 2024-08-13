import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
import UploadFile from './UploadFile';
import "./Feed.css";
import { database } from '../firebase';
import Posts from './Posts';
import Navbar from './Navbar';
function Feed() {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const onsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    })
    return () => {
      onsub();
    }
  }, [user])
  return (
    <>
      <Navbar userData={userData}/>
      <div className='feed'>
        <UploadFile userData={userData} />
        <Posts userData={userData} />
      </div>
    </>

  )
}

export default Feed
