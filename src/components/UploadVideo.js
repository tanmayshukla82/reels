import React, { useContext } from 'react';
import { useState } from "react";
import Button from "@mui/material/Button";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import Alert from "@mui/material/Alert";
import {AuthContext} from '../context/authContext';
import {v4 as uuidv4} from 'uuid'
import { db,storage } from '../firebase';
import LinearProgress from "@mui/material/LinearProgress";
import { Navigate, useNavigate } from 'react-router-dom';
function UploadVideo(props) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = async(file)=>{
        if (file === null) {
          setError("Please select the file first.");
          setTimeout(() => {
            setError("");
          }, 3000);
          return;
        }
        if (file.size / (1024 * 1024) > 100) {
          setError("This video is very big");
          setTimeout(() => {
            setError("");
          }, 3000);
          return;
        }
        try {
          setError('');
          setLoading(true);
          const uid = uuidv4();
          const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
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
                  let obj = {
                    likes: [],
                    comments: [],
                    pId: uid,
                    pUrl: url,
                    uName: props.userData.name,
                    uProfile: props.userData.profileUrl,
                    uID : props.userData.uid,
                    createdAt : db.getTimestamp()
                  };
                  db.posts.add(obj).then(()=>{
                    setLoading(false);
                    navigate('/')
                  }).catch((error)=>{
                    setError(error);
                    setTimeout(()=>{
                        setError('');
                    },3000);
                  });
              })
              
            }
        } catch (error) {
            setError(error);
            setTimeout(()=>{
                setError('');
            },3000)
        }
    }
    return (
      <div>
        {error != "" ? (
          <Alert severity="error" fullWidth margin="normal">
            {error}
          </Alert>
        ) : (
          <>
            <input
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              id="video-input"
              onChange={(e) => handleChange(e.target.files[0])}
            />
            <label htmlFor="video-input">
              <Button
                variant="outlined"
                color="secondary"
                disabled={loading}
                component="span"
              >
                <MovieOutlinedIcon />
                Upload Video
              </Button>
            </label>
            {loading && <LinearProgress color="secondary" />}
          </>
        )}
      </div>
    );
}

export default UploadVideo