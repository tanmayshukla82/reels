import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxNHbMYrBKbR60L-VfiaEyZUo42azRlJQ",
  authDomain: "reels-a64e2.firebaseapp.com",
  projectId: "reels-a64e2",
  storageBucket: "reels-a64e2.appspot.com",
  messagingSenderId: "482031252757",
  appId: "1:482031252757:web:927be9299e4af1c5f4a51c",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const firestore = firebase.firestore();
export const db = {
    users : firestore.collection('users'),
    getTimestamp : firebase.firestore.FieldValue.serverTimestamp,
    posts : firestore.collection('posts')
} 

export const storage = firebase.storage();