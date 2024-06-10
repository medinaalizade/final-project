// src/pages/HomePage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Switch from 'react-switch';
import { toggleDarkMode } from '../redux/actions/themeActions';
import '../styles/HomePage.css';

const HomePage = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    dispatch(toggleDarkMode());
    setTimeout(() => {
      navigate('/focus');
    }, 5000);
  };

  return (
    <div className={`home-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h1 className="focus-text">FOCUS</h1>
      <label htmlFor="material-switch">
        <Switch
          checked={isDarkMode}
          onChange={handleSwitch}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={30}
          width={60}
          className="react-switch"
          id="material-switch"
        />
      </label>
    </div>
  );
};

export default HomePage;
