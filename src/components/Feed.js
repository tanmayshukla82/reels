import React, { useState } from 'react'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext'
import UploadVideo from './UploadVideo';
import {db} from '../firebase'
import Posts from './Posts';
import Navbar from './Navbar';
function Feed() {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  useEffect(()=>{
    const unsub = db.users.doc(user.uid).onSnapshot((snapshot)=>{
      setUserData(snapshot.data());
    })

    return ()=>{unsub()};
  },[user]);
  return (
    <div>
      <Navbar/>
      <>
        <Posts userData={userData} />
      </>
    </div>
  );
}

export default Feed