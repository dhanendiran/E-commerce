import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

function Products({addToCart,searchquery,category,products,setProducts}) {

 


  useEffect(() => {

    async function fetchProducts() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`)
        const data = await response.json()
        setProducts(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()

  }, [])

  if(products.length === 0){
    return <h2>Loading products...</h2>
  }
  const filteredProducts = products.filter(product => {
  const query = searchquery?.toLowerCase();

  const matchesSearch =
    !query ||
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query);

  const matchesCategory =
    !category ||
    product.category.toLowerCase() === category.toLowerCase();

  return matchesSearch && matchesCategory;
});
if(filteredProducts.length===0){
  return <h1 style={{margin:"100px",textAlign:"center"}}>No Records Found</h1>
}
  return (
    
    <div className='products'>
      {filteredProducts.map(p =>{
        console.log(p);
        return <ProductCard key={p.id} product={p} addToCart={addToCart}/> 
      }
        
        
      )}
    </div>
  )
}


export default Products