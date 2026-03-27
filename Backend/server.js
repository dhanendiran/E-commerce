const express = require('express');
const path = require('path');
const cors = require('cors');
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());
let products = [];

const loadProducts = async () => {
  try {
    const res = await fetch("https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json");
    const data = await res.json();
    products = data;
    console.log("Products loaded:", products.length);
  } catch (err) {
    console.log("Error loading products", err);
  }
};

loadProducts();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const orderSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const userSchema=new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true}
})


const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const Order = mongoose.model("Order", orderSchema);
const User=mongoose.model("User",userSchema);




app.get('/', (req, res) => {
  res.send("Backend is running");
});

app.get('/products', (req, res) => {
  res.json(products);
});


app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => Number(p.id) === Number(id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});
app.post('/signup', async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, email, password } = req.body;  

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existinguser = await User.findOne({ email });

    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }


const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  email,
  password: hashedPassword
});

    res.json({
      message: "User created successfully",
      data: user
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Signup error" });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
    console.log("TOKEN GENERATED:", token);

    res.json({
      message: "Login successful",
      token: token
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login error" });
  }
});

app.post('/orders', auth, async (req, res) => {
  try {
    const newOrder = await Order.create({
      userId: req.userId,  
      items: req.body.items,
      total: req.body.total
    });

    res.json({
      message: "Order stored in DB",
      data: newOrder
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving order" });
  }
});

app.get('/orders', auth, async (req, res) => {
  const orders = await Order.find({ userId: req.userId });
  res.json(orders);
});


const PORT = process.env.PORT || 5011;
// Serve frontend static files
app.use(express.static(path.join(__dirname, "../dist")));

// Fallback route for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});