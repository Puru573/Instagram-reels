import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwP2OcissCMK1yw_Xvy4Cmy-MiCYozNbA",
    authDomain: "insta-clone-ad0a7.firebaseapp.com",
    projectId: "insta-clone-ad0a7",
    storageBucket: "insta-clone-ad0a7.appspot.com",
    messagingSenderId: "979383904787",
    appId: "1:979383904787:web:1f8c983403b1cee390ede6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth=firebase.auth();

const firestore=firebase.firestore();
export const database={
    users:firestore.collection("users"),
    posts:firestore.collection("posts"),
    comments: firestore.collection("comments"),
    getTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}

export const storage=firebase.storage();
