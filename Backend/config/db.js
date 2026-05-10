// Backend/config/db.js
// Created by Krish Patel

const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // IMPORTANT for Railway public connection
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  // Required for Railway public MySQL connections from Render
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection when server starts
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Database connected successfully to Railway MySQL');
    connection.release();
  }
});

module.exports = pool.promise();