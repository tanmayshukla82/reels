import React from 'react';
import ReactDOM from 'react-dom';
import './Videos.css';
function Videos(props) {
  const handleClick = (e)=>{
    e.preventDefault();
    e.target.muted = !e.target.muted;
  }
  const handleScroll = (e)=>{
      let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
      if(next)
      {
          next.scrollIntoView();
          e.target.muted = true
      }
  }
  return (
        <video src={props.video} onEnded={handleScroll} className='video-style' muted='muted' onClick={handleClick}></video>
  )
}

export default Videos