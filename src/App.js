// App.js
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import ConfirmationPage from './ConfirmationPage';
import MenuItemDetail from './MenuItemDetail';
import AdminPage from './AdminPage';
import HomePage from './HomePage';
import './App.css';

const App = () => {
  const [language, setLanguage] = useState('et');
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme === 'dark' ? 'dark-mode' : '';
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/:cafeId"
          element={
            <HomePage
              language={language}
              setLanguage={setLanguage}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          }
        />
        <Route path="/:cafeId/detail" element={<MenuItemDetail />} />
        <Route path="/:cafeId/confirmation" element={<ConfirmationPage />} />
        <Route path="/:cafeId/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
