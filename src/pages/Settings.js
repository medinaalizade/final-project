import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/themeProvider';
import '../styles/Settings.css';
import '../styles/themes.css';

const Settings = () => {
  const [showColorThemePopup, setShowColorThemePopup] = useState(false);
  const [showFontPopup, setShowFontPopup] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const { changeTheme } = useTheme();

  const handleColorThemeClick = () => {
    setShowColorThemePopup(true);
  };

  const handleFontClick = () => {
    setShowFontPopup(true);
  };

  const handleLanguageClick = () => {
    setShowLanguagePopup(true);
  };

  const handleCloseColorThemePopup = () => {
    setShowColorThemePopup(false);
  };

  const handleCloseFontPopup = () => {
    setShowFontPopup(false);
  };

  const handleCloseLanguagePopup = () => {
    setShowLanguagePopup(false);
  };

  const changeFontFamily = (fontFamily) => {
    document.body.style.fontFamily = fontFamily;
  };

  const changeLanguage = (language) => {
    console.log(`Changing language to ${language}`);
  };

  return (
    <div className="settings-container">
      <h1>Want to make the page more suitable for you?</h1>
      <div className="settings-buttons">
        <button onClick={handleColorThemeClick}>Change color theme</button>
        <button onClick={handleFontClick}>Change text style</button>
        <button onClick={handleLanguageClick}>Change language</button>
      </div>
      <Link to="/focus">
        <button className="back-button">Back</button>
      </Link>

      {showColorThemePopup && (
        <div className="popup color-theme-popup">
          <button
            className="color-theme-button black"
            style={{ backgroundColor: '#000', color: '#fff' }}
            onClick={() => changeTheme('theme-black')}
          >
            Black
          </button>
          <button
            className="color-theme-button white"
            style={{ backgroundColor: '#fff', border: '1px solid black', color: '#000' }}
            onClick={() => changeTheme('theme-white')}
          >
            White
          </button>
          <button
            className="color-theme-button blue"
            style={{ backgroundColor: 'blue', color: '#fff' }}
            onClick={() => changeTheme('theme-blue')}
          >
            Blue
          </button>
          <button
            className="color-theme-button red"
            style={{ backgroundColor: 'red' }}
            onClick={() => changeTheme('theme-red')}
          >
            Red
          </button>
          <button
            className="color-theme-button green"
            style={{ backgroundColor: 'green' }}
            onClick={() => changeTheme('theme-green')}
          >
            Green
          </button>
          <p>* We are working on creating more comfortable themes for you UwU</p>
          <button className="close-popup-button" onClick={handleCloseColorThemePopup}>Close</button>
        </div>
      )}

      {showFontPopup && (
        <div className="popup font-style-popup">
          <button onClick={() => changeFontFamily('Times New Roman')} style={{ fontFamily: 'Times New Roman' }}>
            Times New Roman
          </button>
          <button onClick={() => changeFontFamily('monospace')} style={{ fontFamily: 'monospace' }}>
            Monospace
          </button>
          <button onClick={() => changeFontFamily('serif')} style={{ fontFamily: 'serif' }}>
            Serif
          </button>
          <button onClick={() => changeFontFamily('sans-serif')} style={{ fontFamily: 'sans-serif' }}>
            Sans-serif
          </button>
          <button onClick={() => changeFontFamily('cursive')} style={{ fontFamily: 'cursive' }}>
            Cursive
          </button>
          <button onClick={() => changeFontFamily('fantasy')} style={{ fontFamily: 'fantasy' }}>
            Fantasy
          </button>
          <button className="close-popup-button" onClick={handleCloseFontPopup}>Close</button>
        </div>
      )}

      {showLanguagePopup && (
        <div className="popup language-popup">
          <button onClick={() => changeLanguage('English')}>English</button>
          <button onClick={() => changeLanguage('Russian')}>Russian</button>
          <button onClick={() => changeLanguage('Azerbaijani')}>Azerbaijani</button>
          <button className="close-popup-button" onClick={handleCloseLanguagePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Settings;
