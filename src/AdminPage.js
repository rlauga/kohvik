import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // ⏱ Funktsioon tellimuste uuendamiseks localStoragest
  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  };

  // ⏲️ Lae tellimused alguses ja iga 5 sekundi tagant
  useEffect(() => {
    loadOrders(); // esmane laadimine
    const interval = setInterval(loadOrders, 5000); // uuendab iga 5s
    return () => clearInterval(interval); // puhastab kui komponent eemaldub
  }, []);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Vale parool');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleCompleteOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.orderId === orderId ? { ...order, status: 'completed' } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  if (!isAuthenticated) {
    return (
      <div className="App">
        <h2>Admini sisselogimine</h2>
        <input
          type="password"
          value={password}
          placeholder="Sisesta parool"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Logi sisse</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h2>Admini tellimused</h2>
      <button onClick={handleLogout}>Logi välja</button>

      {orders.length === 0 ? (
        <p>Ühtegi tellimust pole.</p>
      ) : (
        orders
          .sort((a, b) => new Date(b.time) - new Date(a.time)) // uuemad ees
          .map((order) => (
            <div key={order.orderId} className="order-box">
              <h3>{order.orderId}</h3>
              <p>Aeg: {new Date(order.time).toLocaleString()}</p>
              <p>Kokku: ${order.totalAmount}</p>
              <ul>
                {order.cart.map((item, index) => (
                  <li key={index}>
                    {item.name[order.language]} - ${item.price}
                    {item.excludedIngredients?.length > 0 && (
                      <div>
                        <small>
                          {order.language === 'et' && 'Eemaldatud: '}
                          {order.language === 'en' && 'Removed: '}
                          {order.language === 'ru' && 'Убрано: '}
                          {item.excludedIngredients.join(', ')}
                        </small>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              {order.status === 'completed' ? (
                <button disabled style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                  Väljastatud
                </button>
              ) : (
                <button onClick={() => handleCompleteOrder(order.orderId)}>
                  Märgi valminuks
                </button>
              )}
            </div>
          ))
      )}
    </div>
  );
};

export default AdminPage;
