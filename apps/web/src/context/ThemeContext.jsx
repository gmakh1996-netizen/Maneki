
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const OVERRIDE_KEY = 'themeOverrideUntil';
const OVERRIDE_DURATION = 3 * 60 * 60 * 1000; // 3 საათი ms-ში

const getTimeBasedTheme = () => {
  const hour = parseInt(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tbilisi', hour: 'numeric', hour12: false }), 10);
  return hour >= 6 && hour < 21 ? 'light' : 'dark';
};

const isOverrideActive = () => {
  const until = localStorage.getItem(OVERRIDE_KEY);
  return until && Date.now() < parseInt(until, 10);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (isOverrideActive()) {
      return localStorage.getItem('themeOverrideValue') || getTimeBasedTheme();
    }
    return getTimeBasedTheme();
  });

  // Apply theme to DOM
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
  }, [theme]);

  // Auto-switch at 06:00 and 21:00 — only if no active override
  useEffect(() => {
    const check = () => {
      if (!isOverrideActive()) {
        setTheme(getTimeBasedTheme());
      }
    };
    const interval = setInterval(check, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    // შეინახე override 3 საათით
    localStorage.setItem(OVERRIDE_KEY, String(Date.now() + OVERRIDE_DURATION));
    localStorage.setItem('themeOverrideValue', next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
