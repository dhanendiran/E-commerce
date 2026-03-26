import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5011/products/${id}`);
        const data = await res.json();

        if (!data || data.message) {
          setProduct(null);
        } else {
          setProduct(data);
        }
      } catch (err) {
        console.log(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQty = () => setQty(prev => prev + 1);
  const decreaseQty = () => {
    if (qty > 1) setQty(prev => prev - 1);
  };

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (!product) return <h2 className="error">Product not found</h2>;

  return (
    <div className="product-page">

      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Products
      </button>

      <div className="product-card">

        <div className="image-section">
          <img
            src={product?.image}
            alt={product?.name}
            onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
          />
        </div>

   
        <div className="details-section">

          <p className="category">{product?.category}</p>

          <h1 className="title">{product?.name}</h1>

         
          <div className="rating">
            {"⭐".repeat(Math.round(product?.rating?.stars || 0))}
            <span className="rating-count">
              ({product?.rating?.count || 0} reviews)
            </span>
          </div>

          <h2 className="price">${product?.priceCents}</h2>

          <p className="description">{product?.description}</p>

          
          <div className="quantity">
            <button onClick={decreaseQty}>-</button>
            <span>{qty}</span>
            <button onClick={increaseQty}>+</button>
          </div>

          
          <button
            className="add-btn"
            onClick={() => addToCart({ ...product, quantity: qty })}
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;