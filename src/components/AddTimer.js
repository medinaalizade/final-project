import React, { useState, useEffect } from "react";
import '../styles/AddTimer.css';
import Draggable from "react-draggable";

const AddTimer = ({ onClose }) => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isRest, setIsRest] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            setIsActive(false);
            if (isRest) {
              setIsRest(false);
              return 1500; // 25 minutes in seconds
            } else {
              setIsRest(true);
              return 900; // 15 minutes in seconds for long break
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isRest, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsRest(false);
    setTime(1500);
  };

  const handleShortBreak = () => {
    if (!isActive) {
      setIsActive(false);
      setIsRest(true);
      setTime(300); // 5 minutes in seconds for short break
    }
  };

  const handleLongBreak = () => {
    if (!isActive) {
      setIsActive(false);
      setIsRest(true);
      setTime(900); // 15 minutes in seconds for long break
    }
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <Draggable>
      <div className="timer-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <div className="timer">
          <h1>{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</h1>
        </div>
        <div className="timer-controls">
          {!isActive && (
            <button onClick={toggleTimer} className="start-btn">Start</button>
          )}
          {isActive && (
            <button onClick={toggleTimer} className="pause-btn">Pause</button>
          )}
          <button onClick={handleShortBreak} className="short-break-btn">Short Break</button>
          <button onClick={handleLongBreak} className="long-break-btn">Long Break</button>
          <button onClick={resetTimer} className="reset-btn">Reset</button>
        </div>
      </div>
    </Draggable>
    
  );
};

export default AddTimer;

