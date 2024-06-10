import React, { useState } from 'react';
import '../styles/AddClocks.css';
import Draggable from "react-draggable";

const AddClocks = ({ onClose }) => {
  const [time, setTime] = useState(new Date());

  const updateTime = () => {
    setTime(new Date());
  };

  setInterval(updateTime, 1000);

  return (
    <Draggable>
    <div className="clock-container">
      <div className="clock">
        <button className="close-btn" onClick={onClose}>X</button>
        <h1>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</h1>
        <p>{time.toLocaleDateString()}</p>
      </div>
    </div>
    </Draggable>
  );
};

export default AddClocks;
