import React,{useContext,useEffect,useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/authContext'
import { db } from "../firebase";
import UploadVideo from './UploadVideo';
import Avatar from "@mui/material/Avatar";
import './Navbar.css';
function Navbar() {
  const {logout,user} = useContext(AuthContext);
  const [userData,setUserData] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
     const unsub = db.users.doc(user.uid).onSnapshot((snapshot) => {
       setUserData(snapshot.data());
     });

     return () => {
       unsub();
     };
  },[user]);
  const handleLogout = async()=>{
      try {
          await logout;
          navigate('/login');
      } catch (error) {
          
      }
  }
  return (
    <div className="nav">
      <div style={{ paddingLeft: "1rem", color: "#CD93D7" }}>
        <h2>
          <i>FEED</i>
        </h2>
      </div>
      <UploadVideo userData={userData} />
      <div
        style={{ paddingRight: "1rem", display: "flex", alignItems: "center" }}
      >
        <div style={{ color: "#CD93D7", cursor: "pointer" }}>
          <a onClick={handleLogout} style={{ textDecoration: "none" }}>
            Logout
          </a>
        </div>
        <div style={{ paddingLeft: "1rem" }}>
          <Link to="/profile">
            <Avatar src={userData.profileUrl} />
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Navbar