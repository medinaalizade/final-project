import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile';
import Rooms from './pages/Rooms';
import Diary from './pages/Diary';
import Settings from './pages/Settings';
import About from './pages/About';
import ThemeProvider from './context/themeProvider';
import './styles/themes.css'; // Ensure themes.css is imported globally
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/final-project" element={<HomePage />} />
        <Route path="/focus/*" element={
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="diary" element={<Diary />} />
            <Route path="settings" element={<Settings />} />
            <Route path="about" element={<About />} />
          </Routes>
        } />
        <Route path="/about" element={<About />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
