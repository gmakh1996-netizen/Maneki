
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const getTimeBasedTheme = () => {
  const hour = parseInt(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tbilisi', hour: 'numeric', hour12: false }), 10);
  return hour >= 6 && hour < 21 ? 'light' : 'dark';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTimeBasedTheme);

  // Apply theme to DOM
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
  }, [theme]);

  // Auto-switch at 06:00 and 21:00
  useEffect(() => {
    const check = () => {
      const expected = getTimeBasedTheme();
      setTheme(expected);
    };

    // Check every minute
    const interval = setInterval(check, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
