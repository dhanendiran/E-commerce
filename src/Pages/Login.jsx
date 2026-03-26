import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ user, setuser }) {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();


  const handleSignup = () => {

    if (!user || !email || !password) {
      alert("All fields are required");
      return;
    }

    fetch("http://localhost:5011/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: user,
        email: email,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("SIGNUP RESPONSE:", data);
      alert("Signup successful! Please login.");

      navigate('/');   
    })
    .catch(err => {
      console.error(err);
      alert("Something went wrong");
    });
  };

 
  const handleLogin = () => {

    if (!email || !password) {
      alert("Email & password required");
      return;
    }

    fetch("http://localhost:5011/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("LOGIN RESPONSE:", data);

      if (data.message === "Login successful") {
        
        
        localStorage.setItem("token", data.token);

        alert("Login Successful");
        navigate('/products');
      } else {
        alert(data.message);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Login failed");
    });
  };

 
  const handleLogout = () => {
    localStorage.removeItem("token");   
    alert("Logged out");
  };
  

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Authentication</h2>

       
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setuser(e.target.value)}
            placeholder="Enter name"
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

       
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button className="login-btn" onClick={handleSignup}>
          Signup
        </button>

        <button className="login-btn secondary" onClick={handleLogin}>
          Login
        </button>

        <button
          className="login-btn"
          style={{ backgroundColor: 'red' }}
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Login;