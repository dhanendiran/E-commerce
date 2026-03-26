import React, { useEffect, useState } from 'react'
import './orders.css'

function Order() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          alert(data.message);
        }
      })
      .catch(err => console.log(err));

  }, []);

  if (orders.length === 0) {
    return <h1 className="empty">No Orders Yet 🛒</h1>
  }

  return (
    <div className="orders-container">
      <h2 className="title">Your Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order._id}>

          <div className="order-header">
            <div>
              <h3>Order #{order._id.slice(-5)}</h3>
              <p>{new Date(order.createdAt).toLocaleString()}</p>
            </div>

        <span className={`status ${(order.status || "pending").toLowerCase()}`}>
  {order.status || "Pending"}
</span>
          </div>

          <div className="order-items">
            {order.items.map((item, i) => (
              <div className="order-item" key={i}>
                <span>{item.name}</span>
                <span>₹{item.priceCents} × {item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="order-footer">
            Total: ₹{order.total}
          </div>

        </div>
      ))}
    </div>
  )
}

export default Order