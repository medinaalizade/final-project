import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const savedTheme = localStorage.getItem('theme') || 'theme-black'; // Default theme
  const savedFontFamily = localStorage.getItem('fontFamily') || 'monospace'; // Default font family

  const [theme, setTheme] = useState(savedTheme);
  const [fontFamily, setFontFamily] = useState(savedFontFamily);

  useEffect(() => {
    document.documentElement.className = theme;
    document.body.style.fontFamily = fontFamily;
  }, [theme, fontFamily]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const changeFontFamily = (newFontFamily) => {
    setFontFamily(newFontFamily);
    localStorage.setItem('fontFamily', newFontFamily);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, fontFamily, changeFontFamily }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
