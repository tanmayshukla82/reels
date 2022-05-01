import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Posts.css'
function Like({userData, postData}) {
  const [like, setLike] = useState(null);
  useEffect(()=>{
      let check = postData.likes.includes(userData.uid)?true:false;
      setLike(check);
  },[postData]);
  const handleLike = ()=>{
      if(like === true)
      {
          let nArr = postData.likes.filter((el)=>el!=userData.uid);
          db.posts.doc(postData.postId).update({
              likes:nArr
          })
      }else{
          let nArr = [...postData.likes,userData.uid];
          db.posts.doc(postData.postId).update({
              likes:nArr
          })
      }
  }
  return (
    <div>
      {
        like !== null ? (
        <>{

          like === true?
          <FavoriteIcon className={"icon-styling like"} onClick={handleLike} />:
          <FavoriteIcon className={"icon-styling unlike"} onClick={handleLike} />
        }
        </>
      ) : (
        <></>
      )} 
    </div>
  );
}

export default Like