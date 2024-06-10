import React, { useState, useEffect, useRef } from "react";
import "../styles/Rooms.css";
import { useNavigate } from "react-router-dom";
import AddNotes from "../components/AddNotes";
import AddTimer from "../components/AddTimer";
import AddMusic from "../components/AddMusic";
import AddClocks from "../components/AddClocks";

const Room = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleOptionClick = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    }
    setMenuVisible(false);
  };

  const handleCloseOption = (option) => {
    setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="room-container">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <div
        className="menu-container"
        ref={menuRef}
        onMouseEnter={() => setMenuVisible(true)}
        onMouseLeave={() => setMenuVisible(false)}
      >
        <button className="menu-button" onClick={toggleMenu}>Add</button>
        {menuVisible && (
          <div className="menu-options">
            <button
              className="menu-option"
              onClick={() => handleOptionClick("notes")}
            >
              Notes
            </button>
            <button
              className="menu-option"
              onClick={() => handleOptionClick("timer")}
            >
              Timer
            </button>
            <button
              className="menu-option"
              onClick={() => handleOptionClick("music")}
            >
              Music
            </button>
            <button
              className="menu-option"
              onClick={() => handleOptionClick("clocks")}
            >
              Clocks
            </button>
          </div>
        )}
      </div>
      <div className={`options-container options-${selectedOptions.length}`}>
        {selectedOptions.includes("notes") && (
          <div className="option">
            <AddNotes onClose={() => handleCloseOption("notes")} />
          </div>
        )}
        {selectedOptions.includes("timer") && (
          <div className="option">
            <AddTimer onClose={() => handleCloseOption("timer")} />
          </div>
        )}
        {selectedOptions.includes("music") && (
          <div className="option">
            <AddMusic onClose={() => handleCloseOption("music")} />
          </div>
        )}
        {selectedOptions.includes("clocks") && (
          <div className="option">
            <AddClocks onClose={() => handleCloseOption("clocks")} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;

