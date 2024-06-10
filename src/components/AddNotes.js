import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import '../styles/AddNotes.css';
import Draggable from "react-draggable";

const AddNotes = ({ onClose }) => {
  const [note, setNote] = useState('');

  useEffect(() => {
    const savedNote = localStorage.getItem('note');
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  const handleChange = (value) => {
    setNote(value);
    localStorage.setItem('note', value);
  };

  const handleDeleteAll = () => {
    setNote('');
    localStorage.removeItem('note');
  };

  return (
    <Draggable>
        <div className="add-notes-container">
          <button className="close-btn" onClick={onClose}>X</button>
          <ReactQuill
            theme="snow"
            value={note}
            onChange={handleChange}
            placeholder="Write your note here..."
          />
          <button className="delete-all-btn" onClick={handleDeleteAll}>Delete All</button>
        </div>
    </Draggable>
  );
};

export default AddNotes;
