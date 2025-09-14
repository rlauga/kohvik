// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ConfirmationPage from './ConfirmationPage';
import MenuItemDetail from './MenuItemDetail';
import AdminPage from './AdminPage';
import menuItems from './menuitems';
import './App.css';

const languages = {
  en: {
    header: 'KODUKOHVIK',
    menu: 'Menu',
    cart: 'Cart',
    total: 'Total',
    placeOrder: 'Place Order',
    addToCart: 'Add to Cart',
    remove: 'Remove',
  },
  et: {
    header: 'KODUKOHVIK',
    menu: 'Menüü',
    cart: 'Ostukorv',
    total: 'Kokku',
    placeOrder: 'Esita Tellimus',
    addToCart: 'Lisa Korvi',
    remove: 'Eemalda',
  },
  ru: {
    header: 'KODUKOHVIK',
    menu: 'Меню',
    cart: 'Корзина',
    total: 'Итого',
    placeOrder: 'Оформить заказ',
    addToCart: 'Добавить в корзину',
    remove: 'Удалить',
  },
};

const categoryLabels = {
  starter: { et: 'Eelroad', en: 'Starters', ru: 'Закуски' },
  main: { et: 'Pearoad', en: 'Main Courses', ru: 'Основные блюда' },
  dessert: { et: 'Magustoidud', en: 'Desserts', ru: 'Десерты' },
  drink: { et: 'Joogid', en: 'Drinks', ru: 'Напитки' },
};

const HomePage = ({ cart, setCart, language, setLanguage, theme, toggleTheme, placeOrder }) => {
  const navigate = useNavigate();

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const calculateTotal = () => cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{languages[language].header}</h1>

        <div className="language-switcher">
          <button onClick={() => setLanguage('et')}>ET</button>
          <button onClick={() => setLanguage('en')}>EN</button>
          <button onClick={() => setLanguage('ru')}>RU</button>
        </div>

        <div className="theme-toggle">
          <button onClick={toggleTheme}>
            {theme === 'dark' ? '🌙 Dark' : '🌞 Light'}
          </button>
        </div>

        <div className="admin-link">
          <button onClick={() => navigate('/admin')}>Admin</button>
        </div>
      </header>

      <main>
        <h2>{languages[language].menu}</h2>
        {['starter', 'main', 'dessert', 'drink'].map((category) => (
          <div key={category}>
            <h3>{categoryLabels[category][language]}</h3>
            <ul>
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <li key={item.id}>
                    <div
                      onClick={() => navigate('/detail', { state: { item, language } })}
                      style={{ cursor: 'pointer' }}
                    >
                      <strong>{item.name[language]}</strong> - ${item.price}<br />
                      <small>{item.description[language]}</small>
                    </div>
                    <button onClick={() => addToCart(item)}>{languages[language].addToCart}</button>
                  </li>
                ))}
            </ul>
          </div>
        ))}

        <h2>{languages[language].cart}</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name[language]} - ${item.price}
              {item.excludedIngredients?.length > 0 && (
                <div>
                  <small>
                    {language === 'et' && 'Eemaldatud: '}
                    {language === 'en' && 'Removed: '}
                    {language === 'ru' && 'Убрано: '}
                    {item.excludedIngredients.join(', ')}
                  </small>
                </div>
              )}
              <button onClick={() => removeFromCart(index)}>{languages[language].remove}</button>
            </li>
          ))}
        </ul>

        <h3>{languages[language].total}: ${calculateTotal()}</h3>
        <div className="order-button">
          <button
            onClick={() => placeOrder(cart, language, setCart, navigate)}
            disabled={cart.length === 0}
          >
            {languages[language].placeOrder}
          </button>
        </div>
      </main>
    </div>
  );
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

const placeOrder = (cart, language, setCart, navigate) => {
  const orderId = generateOrderId();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push({ orderId, cart, totalAmount, language, time: new Date().toISOString() });
  localStorage.setItem('orders', JSON.stringify(orders));

  setCart([]);

  navigate('/confirmation', {
    state: {
      cart,
      totalAmount,
      orderId,
      language,
    },
  });
};

const App = () => {
  const [cart, setCart] = useState([]);
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
          path="/"
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
          path="/detail"
          element={<MenuItemDetail language={language} onAddCustomizedItem={(item) => setCart([...cart, item])} />}
        />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
