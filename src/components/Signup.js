import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import '../components/signup.css'
import logo from "../Assets/reels-logo.png"
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Link,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { async } from "@firebase/util";
import { db,storage } from "../firebase";
export default function Signup() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [file,setFile] = useState(null);
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const handleClick = async()=>{
      if(file == null)
      {
          setError('Please upload the profile image first');
          setTimeout(()=>{
            setError('');
          },3000)
          return ;
      }
      try {
          setError('');
          setLoading(true);
          const userObj = await signup(email,password);
          const uid = userObj.user.uid;
          const uploadTask = storage.ref(`/users/${uid}/profile`).put(file);
          uploadTask.on('state_changed',fn1,fn2,fn3);
          function fn1(snapshot)
          {
              let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
              console.log(`upload is ${progress}% done`);
          }
          function fn2(error)
          {
              setError(error);
              setTimeout(()=>{
                setError('');
              },3000);
          }
          function fn3()
          {
              uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                  console.log(url);
                  db.users.doc(uid).set({
                    email,
                    name,
                    password,
                    uid,
                    profileUrl: url,
                    createdAt: db.getTimestamp()
                  });
              })
              setLoading(false);
              navigate('/');
          }
      } catch (e) {
          setError(e);
          setTimeout(() => {
            setError("");
          }, 3000);
      }
  }
  return (
    <div className="card_container">
      <div className="card">
        <Card variant="outlined">
          <div className="img-container">
            <img src={logo} className="logo" />
          </div>
          <CardContent>
            <Typography variant="subtitle1" className="sub1">
              Signup to see photos and videos from your friends.
            </Typography>
            {error !== "" && (
              <Alert severity="error" fullWidth margin="normal">
                {error}
              </Alert>
            )}
            <TextField
              fullWidth
              size="small"
              margin="normal"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              margin="normal"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              margin="normal"
              label="Full Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              variant="outlined"
              fullWidth
              size="small"
              color="secondary"
              component="label"
            >
              Upload Profile Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
          </CardContent>
          <CardActions>
            <Button size="small" fullWidth variant="contained" onClick={handleClick} disabled={loading}>
              Sign Up
            </Button>
          </CardActions>
        </Card>
        <Card variant="outlined" className="card2">
          <CardContent>
            <Typography variant="subtitle1" className="sub1">
              Have an account ?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
