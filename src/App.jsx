
import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/products'
import Cart from './Pages/Cart'
import Login from './Pages/Login' 
import Orders from './Pages/orders'
import { useState,useEffect } from 'react'
import ProductedRoute from './components/productedRoute'
import ProductDetails from './components/productDetails'

function App() {
   const [user, setuser] = useState('');
  const[searchquery,setsearchquery]=useState('')
  const[category,setCategory]=useState("")
   const [products, setProducts] = useState([])

  const [cart,setCart]=useState(()=>{
    const store=localStorage.getItem('cart')
    return store?JSON.parse(store):[]
  })
  

    const addToCart = (product) => {
    setCart(prevcart=>{
    const existing=prevcart.find(item=>item.id===product.id)
    if(existing)
      return prevcart.map(item=>item.id===product.id?{...item,quantity:item.quantity+1}:item)
    else
      return [...prevcart, { ...product, quantity: 1 }]
  })
}
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart))
}, [cart])
useEffect(() => {
  const handleStorageChange = () => {
    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    } catch (error) {
      console.log("Error syncing cart:", error)
    }
  }

  window.addEventListener('storage', handleStorageChange)

  return () => {
    window.removeEventListener('storage', handleStorageChange)
  }
}, [])
 
  return (
    <BrowserRouter>
    <Navbar cart={cart} searchquery={searchquery} setsearchquery={setsearchquery} category={category} setCategory={setCategory}  />
    <Routes>
      <Route path='/' element={<Home products={products} addToCart={addToCart}/>} />
      <Route path='/products' element={<ProductedRoute><Products addToCart={addToCart} searchquery={searchquery} category={category} products={products} setProducts={setProducts} /></ProductedRoute>} />
      <Route path='/cart' element={<ProductedRoute><Cart cart={cart} setCart={setCart}/></ProductedRoute>} />
      <Route path='/product/:id'element={<ProductDetails addToCart={addToCart} />}/>
      <Route path='/login' element={<Login user={user} setuser={setuser}/>} />
      <Route path="/orders" element={<ProductedRoute><Orders /></ProductedRoute>} />
    </Routes>

    </BrowserRouter>
   
  )
   
}


export default App
