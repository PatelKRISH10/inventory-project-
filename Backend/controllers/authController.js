const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// ==========================================
// LOGIN FUNCTION (TEMPORARY TEST VERSION)
// Created by Krish Patel
// ==========================================
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user in database
    const [users] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    // User not found
    if (users.length === 0) {
      return res.status(401).json({
        message: 'User not found'
      });
    }

    const user = users[0];

    // TEMPORARY TEST:
    // Ignore bcrypt and directly check if password is admin123
    if (password !== 'admin123') {
      return res.status(401).json({
        message: 'Password does not match admin123'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send success response
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// ==========================================
// REGISTER FUNCTION
// Created by Krish Patel
// ==========================================
const register = async (req, res) => {
  try {
    const { name, username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)',
      [name, username, hashedPassword, role || 'worker']
    );

    res.status(201).json({
      message: 'User created successfully'
    });

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        message: 'Username already exists'
      });
    }

    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = { login, register };