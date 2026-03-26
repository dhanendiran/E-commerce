import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar({ cart,searchquery ,setsearchquery,setCategory}) {

  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="navbar">

      <h2>MyStore</h2>
      <div className='search-container'>
        <input type="text" placeholder="Search..." value={searchquery} onChange={(e)=>setsearchquery(e.target.value)} />
      </div>
      <div className="category-container">
        <select className="category-select" onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Beauty & Personal Care">Beauty & Personal Care</option>
          <option value="Electronics & Gadgets">Electronics & Gadgets</option>
          <option value="Fashion & Apparel">Fashion & Apparel</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Health & Fitness">Health & Fitness</option>
        </select>
      </div>
     
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">
          Cart ({cart.length})
        </Link>
        <Link to="/orders">Orders</Link>

         
         {isLoggedIn ? (
  <button onClick={handleLogout}>Logout</button>
) : (
  <Link to="/login">Login</Link>
)}
        

      </div>
    </div>
  )
}

export default Navbar