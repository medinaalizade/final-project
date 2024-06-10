import React, { useState, useEffect, useRef } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/Calendar.css';

const localizer = momentLocalizer(moment);

const Calendar = ({ events, setEvents }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, title: '', start: null, end: null });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const titleInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    if (showForm) {
      titleInputRef.current.focus();
    }
  }, [showForm]);

  const handleSelectSlot = ({ start, end }) => {
    setFormData({ id: new Date().getTime(), title: '', start, end });
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (formData.title.trim().length === 0) {
      setShowWarning(true);
      return;
    }

    const hasDuplicateTitle = events.some(
      event =>
        event.start === formData.start && event.end === formData.end && event.title === formData.title.trim()
    );

    if (hasDuplicateTitle) {
      alert("An event with the same title already exists for this time range.");
      return;
    }

    setEvents([...events, { ...formData, title: formData.title.trim() }]);
    setShowForm(false);
  };

  const handleEventDelete = (event) => {
    setEventToDelete(event);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    setEvents(events.filter(e => e.id !== eventToDelete.id));
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleWarningClick = () => {
    setShowWarning(false);
    setShowForm(false);
  };

  return (
    <div className="calendar-container" onClick={handleWarningClick}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventDelete}
        views={['month', 'week']}
        defaultView='month'
        style={{ height: 'calc(100vh - 80px)' }}
      />
      {showForm && (
        <div className="event-form-container" onClick={e => e.stopPropagation()}>
          <form className="event-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <input
              ref={titleInputRef}
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Event title"
              required
            />
            <div className="form-buttons">
              <button type="submit">Create</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {showDeleteConfirmation && (
        <div className="delete-confirmation-container" onClick={e => e.stopPropagation()}>
          <div className="delete-confirmation">
            <p>Are you sure you want to delete the event "{eventToDelete.title}"?</p>
            <div className="confirmation-buttons">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
      {showWarning && (
        <div className="warning-container">
          <div className="warning">
            <p>Event title can't be empty.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
