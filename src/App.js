// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import ConfirmationPage from './ConfirmationPage';
import MenuItemDetail from './MenuItemDetail';
import AdminPage from './AdminPage';
import AdminLogin from './AdminLogin';
import HomePage from './HomePage';
import menuItems from './menuitems';
import './App.css';

const AppWrapper = () => {
  const [cart, setCart] = useState([]);
  const [language, setLanguage] = useState('et');
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme === 'dark' ? 'dark-mode' : '';
  };

  const generateOrderId = () => {
    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
    const key = `order-seq-${datePart}`;
    const lastNumber = parseInt(localStorage.getItem(key)) || 0;
    const nextNumber = lastNumber + 1;
    localStorage.setItem(key, nextNumber);
    return `ORDER-${datePart}-${String(nextNumber).padStart(4, '0')}`;
  };

  const placeOrder = (cafeId, cart, language, setCart, navigate) => {
    const orderId = generateOrderId();
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    const ordersKey = `orders-${cafeId}`;
    const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
    orders.push({
      orderId,
      cart,
      totalAmount,
      language,
      time: new Date().toISOString(),
      status: 'pending',
    });
    localStorage.setItem(ordersKey, JSON.stringify(orders));
    setCart([]);
    navigate(`/${cafeId}/confirmation`, {
      state: {
        cart,
        totalAmount,
        orderId,
        language,
      },
    });
  };

  return (
    <Routes>
      <Route
        path="/:cafeId"
        element={
          <HomePage
            cart={cart}
            setCart={setCart}
            language={language}
            setLanguage={setLanguage}
            theme={theme}
            toggleTheme={toggleTheme}
            placeOrder={placeOrder}
          />
        }
      />
      <Route
        path="/:cafeId/detail"
        element={
          <MenuItemDetail
            language={language}
            onAddCustomizedItem={(item) => setCart((prev) => [...prev, item])}
          />
        }
      />
      <Route path="/:cafeId/confirmation" element={<ConfirmationPage />} />
      <Route path="/:cafeId/admin-login" element={<AdminLogin />} />
      <Route path="/:cafeId/admin" element={<AdminPage />} />
    </Routes>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
