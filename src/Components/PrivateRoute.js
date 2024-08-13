import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import {Navigate } from 'react-router-dom'
function PrivateRoute({element,...rest}){
    const {user}=useContext(AuthContext);
  return user ? (
    element
  ):(
    <Navigate to="/login" replace/>
  )
}

export default PrivateRoute
