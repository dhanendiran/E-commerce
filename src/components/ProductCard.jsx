import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({product,addToCart}) {

    return (
        <div className='card'>
           <Link to={`/product/${product.id}`} className="product-link">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.priceCents}</p>
      </Link>
             <button onClick={()=>addToCart(product)}>
  Add to Cart
</button>
        </div>
    )
}

export default ProductCard
