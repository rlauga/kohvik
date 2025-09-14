// ConfirmationPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="App">
        <h2>Invalid access</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const { orderId, totalAmount, cart, language } = state;

  const thankYouMessages = {
    et: 'Aitäh tellimuse eest!',
    en: 'Thank you for your order!',
    ru: 'Спасибо за ваш заказ!',
  };

  const backToStart = {
    et: 'Tagasi avalehele',
    en: 'Back to Home',
    ru: 'На главную',
  };

  return (
    <div className="App">
      <h2>{thankYouMessages[language] || thankYouMessages.et}</h2>
      <p>Tellimuse nr: {orderId}</p>
      <p>Kokku: ${totalAmount}</p>
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
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>
        {backToStart[language] || backToStart.et}
      </button>
    </div>
  );
};

export default ConfirmationPage;
