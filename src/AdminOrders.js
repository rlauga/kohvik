// AdminOrders.js
import React, { useEffect, useState } from 'react';
import './App.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error('Viga tellimuste laadimisel:', e);
      }
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tellimused</h1>
      </header>
      <main>
        {orders.length === 0 ? (
          <p>Tellimusi ei ole veel tehtud.</p>
        ) : (
          <ul>
            {orders.map((order, index) => (
              <li key={index} className="order-confirmed">
                <p><strong>Tellimuse ID:</strong> {order.orderId}</p>
                <p><strong>Summa:</strong> ${order.total}</p>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item.name.et} - ${item.price}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default AdminOrders;
