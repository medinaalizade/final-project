import React from 'react';
import '../styles/About.css';
import { useNavigate } from 'react-router-dom';
import profileImage from '../images/profile.png';
import focusImg from '../images/focus.jpg';
import mainpage from '../images/MainPage.jpg';
import diaryImg from '../images/DiaryPage.jpg';
import RoomImg from '../images/RoomPage.jpg';
import colorThemeImg from '../images/colorchange.jpg';
import fontfamily from '../images/fontfamilyImg.jpg';

const About = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/focus');
  };

  return (
    <>
      <button className="back-button" onClick={handleBack}>Back</button>
      <div className="anchor-links">
        <a href="#why-use">Why?</a>
        <a href="#how-to-use">How to use</a>
        <a href="#about-developer">Developer</a>
      </div>
      <div id="why-use" className="section">
        <h2 className='heading'>Why use this application?</h2>
        <div className='flex-style'>
          <p>
            Nowadays, many people struggle with their own laziness and have difficulty staying focused while working. <br />
            Our application is developed to help people maintain their focus and productivity. <br /><br/>
          </p>
          <img src={focusImg} alt="decorative" className="responsive-image" />
        </div>
      </div>
      <hr />
      <div id="how-to-use" className="section">
        <h2 className='heading'>How to use</h2>
        <p>
          After signing up, you access to various features of our application:
        </p>
        <div className='flex-style'>
          <p>You can track their events and tasks, as well as create daily to-do lists.</p>
          <img src={mainpage} alt="Main Page's screen" className="responsive-image" />
        </div>
        <div className='flex-style'>
          <img src={diaryImg} alt="Diary Page's screen" className="responsive-image" />
          <p>You can maintain a personal journal to keep mind calm and organized.</p>
        </div>
        <p>You can use the virtual room to stay focused while working, with tools such as clocks, timer,
             notes, and videos available. The customizable settings allow you to personalize the application
             according to personal preferences, adjusting the theme, font style, and language.</p>
        <div className='flex-style'>
          <img src={RoomImg} alt="Rooms Page's screen" className="responsive-image" />
          <div className='flex'>
            <img src={colorThemeImg} alt="Color theme function's screen" className="responsive-image-small" />
            <img src={fontfamily} alt="Font-family theme function's screen" className="responsive-image-small" />
          </div>
        </div>
      </div>
      <hr />
      <div id="about-developer" className="section last">
        <h2 className='heading'>About the Developer</h2>
        <img src={profileImage} alt="Medina Ali-zade" className="profile-image" />
        <h1 style={{textAlign:'center'}}>Hello! I am Medina Ali-zade, <br />Junior Web Developer</h1>
        <p>I am one of the people who have problem with focusing on important task. To make my life easier, I had to learn how to stay focused, 
          work without distraction and it wasn't easy. it was difficult to find an application which could help me at past, so I decided to create one myself. 
          <br />Hope you'll find it useful! 
        </p>
        <hr />
        <h2 className='heading'>Want to contact me?</h2>
        <div className='contacts'>
          <a href='mailto:medina.ali-zade@mail.ru'>Mail</a>
          <a href='https://github.com/medinaalizade' target='_blank'rel="noreferrer" alt="github link">GitHub</a>
        </div>
      </div>
    </>
  );
};

export default About;
