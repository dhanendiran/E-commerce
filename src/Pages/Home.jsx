import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard'; 

function Home({ addToCart }) {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchTrending=async()=>{
      try {
        const response = await fetch("http://localhost:5011/products");
        const data = await response.json();
        setTrendingProducts(data.slice(0, 4));
        
      } catch (error) {
        console.log("Error fetching trending products:", error);
      }
    }

    fetchTrending();
  }, []);

  return (
    <div className="home-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div 
        className="hero-banner" 
        style={{ 
          backgroundColor: '#0f172a',
          color: 'white', 
          padding: '4rem 2rem', 
          borderRadius: '12px', 
          textAlign: 'center', 
          marginBottom: '3rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}
      >
        <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>Discover the Best Deals</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#cbd5e1' }}>
          Shop our exclusive collection of top-rated products.
        </p>
        <Link 
          to="/products" 
          style={{ 
            backgroundColor: '#38bdf8', 
            color: '#0f172a', 
            padding: '12px 30px', 
            textDecoration: 'none', 
            fontWeight: 'bold', 
            borderRadius: '50px', 
            fontSize: '1.1rem',
            transition: 'background-color 0.2s'
          }}
        >
          View All Products
        </Link>
      </div>
      <div className="trending-section">
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '3px solid #38bdf8', display: 'inline-block', paddingBottom: '0.5rem' }}>
          🔥 Trending Right Now
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          {trendingProducts.length > 0 ? (
            trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))
          ) : (
            <p>Loading trending items...</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default Home;