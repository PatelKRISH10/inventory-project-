// Created by Krish Patel

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const menuRoutes = require('./routes/menuRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const unitRoutes = require('./routes/unitRoutes');
const stockTransactionRoutes = require('./routes/stockTransactionRoutes');

const app = express();

// CORS configuration for local development and Vercel production
app.use(cors({
  origin: [
    'https://um-inventory.vercel.app',
    'https://um-inventory-gyt7crz4g-krish-patels-projects1.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/stock', stockTransactionRoutes);

// Optional test route
app.get('/', (req, res) => {
  res.send('UM Inventory Backend is Running Successfully!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});