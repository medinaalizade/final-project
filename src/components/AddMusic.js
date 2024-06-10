import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import '../styles/AddMusic.css';
import Draggable from "react-draggable";


const AddMusic = ({ onClose }) => {
  const [url, setUrl] = useState('');
  const [playingUrl, setPlayingUrl] = useState(null);
  const audioRef = useRef(null);
  const youtubeRef = useRef(null);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handlePlay = () => {
    if (url.trim() !== '') {
      setPlayingUrl(url);
    } else {
      alert('Please enter a valid URL.');
    }
  };

  const clearUrl = () => {
    setUrl('');
  };

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?list=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const renderPlayer = () => {
    const videoId = getYouTubeId(playingUrl);
    if (videoId) {
      return (
        <YouTube
          videoId={videoId}
          opts={{ width: '100%', height: 'auto', playerVars: { autoplay: 1 } }}
          onReady={(event) => { youtubeRef.current = event.target; }}
        />
      );
    } else {
      return <audio ref={audioRef} src={playingUrl} controls autoPlay />;
    }
  };

  return (
    <Draggable>
    <div className="music-container" style={{ height: playingUrl ? 'auto' : '100px' }}>
      <button className="close-btn" onClick={onClose}>X</button>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter music URL"
          value={url}
          onChange={handleUrlChange}
        />
        <button className='delete-url' onClick={clearUrl}>X</button>
        <button className='play-music-btn' onClick={handlePlay}>Play</button>
      </div>
      {playingUrl && (
        <div className="player-container">
          {renderPlayer()}
        </div>
      )}
    </div>
    </Draggable>
  );
};

export default AddMusic;
