// PaymentPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

const banks = [
  { name: 'Swedbank', baseUrl: '/payment', logo: '/images/swedbank.png' },
  { name: 'LHV', baseUrl: '/payment', logo: '/images/lhv.png' },
  { name: 'SEB', baseUrl: '/payment', logo: '/images/seb.png' },
  { name: 'Coop Pank', baseUrl: '/payment', logo: '/images/coop.png' },
  { name: 'Luminor', baseUrl: '/payment', logo: '/images/luminor.png' },
];

const languages = {
  en: {
    confirmationTitle: 'Redirecting to Bank',
    loading: 'Processing payment...',
  },
  et: {
    confirmationTitle: 'Suunamine panka',
    loading: 'Töötleme makset...',
  },
  ru: {
    confirmationTitle: 'Перенаправление в банк',
    loading: 'Обработка платежа...',
  },
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalAmount, orderId, language } = location.state || {};

  const [selectedBank, setSelectedBank] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBankClick = (bank) => {
    console.log("Makse sooritatud pangaga:", bank.name);
    setSelectedBank(bank.name);
    setLoading(true);

    // Simuleeri makse töötlemist ja suuna kinnitusele
    setTimeout(() => {
      navigate('/confirmation', {
        state: {
          orderId,
          totalAmount,
          selectedBank: bank.name,
          language,
        },
      });
    }, 2000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{languages[language]?.confirmationTitle || 'Redirecting to Bank'}</h1>
      </header>

      {loading ? (
        <div style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
          {languages[language]?.loading || 'Processing payment...'}
        </div>
      ) : (
        <main>
          <h2>Vali pank / Choose a bank:</h2>
          <div className="bank-select">
            {banks.map((bank) => (
              <div
                key={bank.name}
                className={`bank-option ${selectedBank === bank.name ? 'selected-bank' : ''}`}
                onClick={() => handleBankClick(bank)}
              >
                <img src={bank.logo} alt={bank.name} className="bank-logo" />
                <span>{bank.name}</span>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
};

export default PaymentPage;
