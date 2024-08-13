import React,{useState,useEffect, createContext, Children} from "react";
import {auth} from "../firebase";
export const AuthContext=createContext();


export function AuthProvider({children}){
    const [user,setUser]=useState();
    const [loading,setLoading]=useState(true);

    function signup(email,Password){
        return auth.createUserWithEmailAndPassword(email,Password);
    }

    function login(email,Password){
        return auth.signInWithEmailAndPassword(email,Password);
    }
    function logout(){
        return auth.signOut();
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    useEffect(()=>{
        const unsub=auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false);
        })
        return ()=>{
            unsub();
        }
    },[])

    const store={
        user,
        signup,
        login,
        logout,
        resetPassword
    }
    
    return(
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
