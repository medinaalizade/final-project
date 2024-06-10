import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Diary.css';

const Diary = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [entry, setEntry] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [fontStyle, setFontStyle] = useState('monospace');
  const [fontSize, setFontSize] = useState('16');
  const [notes, setNotes] = useState([]);
  const [showTools, setShowTools] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    // Load saved notes from localStorage when the component mounts
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    // Save notes to localStorage whenever the notes state changes
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSave = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      setWarningMessage("Title can't be empty!");
      return;
    }
    if (title && date && entry) {
      const newNote = { title, date, entry, textColor, fontStyle, fontSize };
      if (editingNote !== null) {
        const updatedNotes = notes.map((note, index) =>
          index === editingNote ? newNote : note
        );
        setNotes(updatedNotes);
        setEditingNote(null);
      } else {
        setNotes([...notes, newNote]);
      }
      setTitle('');
      setDate('');
      setEntry('');
      setWarningMessage(''); // Reset warning message if save is successful
    } else {
      setWarningMessage('Please fill in all fields.');
    }
  };

  const handleNoteClick = (note, index) => {
    setTitle(note.title);
    setDate(note.date);
    setEntry(note.entry);
    setTextColor(note.textColor);
    setFontStyle(note.fontStyle);
    setFontSize(note.fontSize);
    setEditingNote(index);
  };

  const handleCancelEdit = () => {
    setTitle('');
    setDate('');
    setEntry('');
    setTextColor('#000000');
    setFontStyle('monospace');
    setFontSize('16');
    setEditingNote(null);
  };

  const handleDeleteNote = () => {
    if (editingNote !== null) {
      const updatedNotes = notes.filter((_, index) => index !== editingNote);
      setNotes(updatedNotes);
      handleCancelEdit();
    }
  };

  const handleDeleteAll = () => {
    setNotes([]);
    localStorage.removeItem('notes');
  };

  return (
    <div className="diary-container" style={{ backgroundColor: '#000' }}>
      <div className="personal-journal">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className='for-tools' type="button" onClick={() => setShowTools(!showTools)}>
          A
        </button>
        {showTools && (
          <div className="entry-tools">
            <label>
              Text Color:
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </label>
            <label>
              Font Size:
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
              />
            </label>
            <label>
              Font Style:
              <select
                value={fontStyle}
                onChange={(e) => setFontStyle(e.target.value)}
              >
                <option value="monospace">Monospace</option>
                <option value="serif">Serif</option>
                <option value="sans-serif">Sans-serif</option>
                <option value="cursive">Cursive</option>
                <option value="fantasy">Fantasy</option>
              </select>
            </label>
          </div>
        )}
        <textarea
          className="entry-textarea"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          style={{
            color: textColor,
            fontFamily: fontStyle,
            fontSize: `${fontSize}px`,
          }}
          placeholder="Write your note here..."
        />
        <button type="submit" onClick={handleSave}>
          Save
        </button>
        {warningMessage && <p className="warning-message">{warningMessage}</p>}
        {editingNote !== null && (
          <>
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
            <button
              type="button"
              className="delete-button"
              onClick={handleDeleteNote}
            >
              Delete
            </button>
          </>
        )}
        <Link to="/focus" className="back-button">
          Back
        </Link>
      </div>
      <div className="saved-notes">
        <h2>Saved Notes</h2>
        {notes.map((note, index) => (
          <div
            key={index}
            className="note-title"
            onClick={() => handleNoteClick(note, index)}
          >
            {note.title} - {note.date}
          </div>
        ))}
        <button className="delete-all-button" onClick={handleDeleteAll}>
          Delete All
        </button>
      </div>
    </div>
  );
};

export default Diary;
