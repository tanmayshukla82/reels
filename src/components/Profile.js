import React,{useState,useEffect,useContext} from 'react'
import { AuthContext } from '../context/authContext'
import { db,storage } from '../firebase';
function Profile({userData}) {
  const [posts,setPosts] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(()=>{
     const unsub = db.users.doc(user.uid).onSnapshot((snapshot) => {
       setUserData(snapshot.data());
     });
     return () => {
       unsub();
     };
  },[user]);
  useEffect(()=>{
    let parr = [];
    let unsub = db.posts
    .orderBy("createdAt", "desc")
    .onSnapshot((querySnapshot) => {
        parr = [];
        let parrN = [];
        querySnapshot.forEach((doc) => {
        let data = { ...doc.data(), postId: doc.id };
        parr.push(data);
        });
        parrN = parr.filter((data)=>{
            return data.uID === userData.uid;
        })
        setPosts(parrN);
    },[]);
    return unsub;
  })
  return (
    <>
        
    </>
  )
}

export default Profile