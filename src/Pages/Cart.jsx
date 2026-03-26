import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


function Cart({ cart, setCart }) {
    const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
 console.log("Token",token)
  
  const addquantity = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };
  const handlecheckout = () => {

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

 const token = localStorage.getItem("token");

fetch(`${import.meta.env.VITE_API_URL}/orders`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`  
  },
  body: JSON.stringify({
    items: cart,
    total: total
  })
})
  .then(res => res.json())
  .then(data => {
    console.log("Order response:", data);
    alert("Order placed successfully");
    navigate("/orders")
    setCart([]);
  })
  .catch(err => {
    console.error(err);
    alert("Something went wrong");
  });
};

  const subquantity = (id) => {
    setCart(
      cart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

 
  const total = cart.reduce(
    (acc, item) => acc + item.
priceCents
 * item.quantity,
    0
  );
  

  return (
    <div className="cart-container">

      {cart.length > 0 ? (
        <>
          <div className="cart-grid">
            {cart.map((c,index) => (
              <div key={index} className="cart-item">
                <img src={c.image} alt={c.title} />

                <h3>{c.name}</h3>

                <p>Price: ${c.priceCents}</p>

                <div className="quantity">
                  <button disabled={c.quantity===1} onClick={() => subquantity(c.id)}>-</button>
                  <span>{c.quantity}</span>
                  <button onClick={() => addquantity(c.id)}>+</button>
                </div>

                <p>
                  Subtotal: ${(c.priceCents * c.quantity).toFixed(2)}
                </p>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(c.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="total-box">
            <h2>Grand Total: ${total.toFixed(2)}</h2>

            <button
              className="clear-btn"
              onClick={() => setCart([])}
            >
              Clear Cart
            </button>
            <button className="clear-btn" style={{marginLeft:"10px",backgroundColor:"green"}} onClick={handlecheckout}>Checkout</button>
          </div>
        </>
      ) : (
        <p className="empty">Your cart is empty!</p>
      )}

    </div>
  );
}

export default Cart;