// HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const categoryLabels = {
  starter: { et: 'Eelroad', en: 'Starters', ru: 'Закуски' },
  main: { et: 'Pearoad', en: 'Main Courses', ru: 'Основные блюда' },
  dessert: { et: 'Magustoidud', en: 'Desserts', ru: 'Десерты' },
  drink: { et: 'Joogid', en: 'Drinks', ru: 'Напитки' },
};

const HomePage = ({ language, setLanguage, theme, toggleTheme }) => {
  const navigate = useNavigate();
  const { cafeId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  // 🔥 Firebase'ist menüü laadimine
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, `menus-${cafeId}`));
      const items = querySnapshot.docs.map(doc => doc.data());
      setMenuItems(items);
    };
    fetchData();
  }, [cafeId]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const calculateTotal = () => cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {
    const orderId = generateOrderId();
    const totalAmount = calculateTotal();
    const ordersKey = `orders-${cafeId}`;
    const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
    orders.push({ orderId, cart, totalAmount, language, time: new Date().toISOString() });
    localStorage.setItem(ordersKey, JSON.stringify(orders));
    setCart([]);
    navigate(`/${cafeId}/confirmation`, {
      state: { cart, totalAmount, orderId, language }
    });
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>KODUKOHVIK ({cafeId})</h1>
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
          <button onClick={() => navigate(`/${cafeId}/admin`)}>Admin</button>
        </div>
      </header>

      <main>
        <h2>{language === 'et' ? 'Menüü' : language === 'en' ? 'Menu' : 'Меню'}</h2>

        {['starter', 'main', 'dessert', 'drink'].map((category) => (
          <div key={category}>
            <h3>{categoryLabels[category][language]}</h3>
            <ul>
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <li key={item.id}>
                    <div
                      onClick={() =>
                        navigate(`/${cafeId}/detail`, { state: { item, language } })
                      }
                      style={{ cursor: 'pointer' }}
                    >
                      <strong>{item.name[language]}</strong> - ${item.price}
                      <br />
                      <small>{item.description[language]}</small>
                    </div>
                    <button onClick={() => addToCart(item)}>
                      {language === 'et'
                        ? 'Lisa korvi'
                        : language === 'en'
                        ? 'Add to Cart'
                        : 'Добавить в корзину'}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}

        <h2>
          {language === 'et' ? 'Ostukorv' : language === 'en' ? 'Cart' : 'Корзина'}
        </h2>
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
              <button onClick={() => removeFromCart(index)}>
                {language === 'et'
                  ? 'Eemalda'
                  : language === 'en'
                  ? 'Remove'
                  : 'Удалить'}
              </button>
            </li>
          ))}
        </ul>

        <h3>
          {language === 'et' && 'Kokku'}
          {language === 'en' && 'Total'}
          {language === 'ru' && 'Итого'}: ${calculateTotal()}
        </h3>

        <div className="order-button">
          <button onClick={placeOrder} disabled={cart.length === 0}>
            {language === 'et' && 'Esita tellimus'}
            {language === 'en' && 'Place Order'}
            {language === 'ru' && 'Оформить заказ'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
