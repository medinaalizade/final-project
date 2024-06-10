import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <ul>
        <li className={activeLink === '/focus/profile' ? 'active' : ''}>
          <Link to="/focus/profile" onClick={() => setActiveLink('/focus/profile')}>Profile</Link>
        </li>
        <li className={activeLink === '/focus/rooms' ? 'active' : ''}>
          <Link to="/focus/rooms" onClick={() => setActiveLink('/focus/rooms')}>Rooms</Link>
        </li>
        <li className={activeLink === '/focus/diary' ? 'active' : ''}>
          <Link to="/focus/diary" onClick={() => setActiveLink('/focus/diary')}>Diary</Link>
        </li>
        <li className={activeLink === '/focus/settings' ? 'active' : ''}>
          <Link to="/focus/settings" onClick={() => setActiveLink('/focus/settings')}>Settings</Link>
        </li>
        <li className={activeLink === '/focus/about' ? 'active' : ''}>
          <Link to="/focus/about" onClick={() => setActiveLink('/focus/about')}>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
