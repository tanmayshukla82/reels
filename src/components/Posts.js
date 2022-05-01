import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Videos from './Videos';
import Avatar from "@mui/material/Avatar";
import './Posts.css'
import Like from './Like';
function Posts({userData}) {
  const [posts,setPosts] = useState(null);
  useEffect(()=>{
    let parr = [];
    let unsub = db.posts.orderBy('createdAt','desc').onSnapshot((querySnapshot)=>{
        parr = [];
        querySnapshot.forEach((doc)=>{
            let data = {...doc.data(), postId:doc.id}
            parr.push(data);
        })
        setPosts(parr);
    })
    return unsub;
  },[]);
  const callback = (entries) => {
    entries.forEach((entry) => {
      let ele = entry.target.childNodes[0];
      ele.play().then(() => {
        if (!ele.paused && !entry.isIntersecting) {
          ele.pause();
        }
      });
    });
  };
  let observer = new IntersectionObserver(callback, { threshold: 0.6 });
  useEffect(() => {
    const elements = document.querySelectorAll(".videos");
    elements.forEach((element) => {
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
    };
  }, [posts]);
  return (
    <div>
      {
        posts==null || userData==null ? <CircularProgress /> :
        <div className="video-container">
          {
            posts.map((post,index)=>(
              <React.Fragment key={index}>
                  <div className="videos">
                      <Videos video={post.pUrl}/>
                      <div className="fa" style={{display:'flex'}}>
                          <Avatar src={post.uProfile} />
                          <h4>{post.uName}</h4>
                      </div>
                  </div>
              </React.Fragment>
          ))
          }
        </div>
      }
    </div>
  )}

export default Posts