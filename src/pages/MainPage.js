import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Calendar from '../components/Calendar';
import DayCalendar from '../components/DayCalendar';
import '../styles/MainPage.css';
import calendarIcon from '../images/calendar.png';

const quotes = [
  "People with goals succeed because they know where they're going.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "The only way to achieve the impossible is to believe it is possible.",
  "Believe you can and you're halfway there.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "A year from now you may wish you had started today.",
  "Don't wait. The time will never be just right.",
  "You are never too old to set another goal or to dream a new dream.",
  "Start where you are. Use what you have. Do what you can.",
  "Your time is limited, so don’t waste it living someone else’s life.",
  "I can't always control mu thoughts but I can choose how I respond to them.",
  "Don’t let yesterday take up too much of today.",
  "You learn more from failure than from success.",
  "If you are working on something that you really care about, you don’t have to be pushed.",
  "People who are crazy enough to think they can change the world are the ones who do.",
  "Failure will never overtake me if my determination to succeed is strong enough.",
  "With self-discipline most anything is possible.",
  "We may encounter many defeats but we must not be defeated.",
  "Knowing is not enough; we must apply. Wishing is not enough; we must do.",
  "The only place where success comes before work is in the dictionary."
];

const MainPage = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [events, setEvents] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 600000);

    return () => clearInterval(intervalId);
  }, []);

  const handleImageClick = () => {
    setShowCalendar(true);
  };

  const handleHideCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <div className="main-page">
      <Navbar />
      <div className="main-content">
        <div className={`message ${showCalendar ? 'message-expanded' : ''}`}>
          <div className="quota">{currentQuote}</div>
          <div className="day-calendar">
            <DayCalendar events={events} setEvents={setEvents} />
          </div>
        </div>
        <div className={`calendar-section ${showCalendar ? 'calendar-visible' : ''}`}>
          {!showCalendar ? (
            <img
              src={calendarIcon}
              alt="Calendar Icon"
              className="calendar-icon"
              onClick={handleImageClick}
            />
          ) : (
            <div>
              {handleHideCalendar && (
                <button className="hide-button" onClick={handleHideCalendar}>Close calendar</button>
              )}
              <Calendar events={events} setEvents={setEvents} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
