const mysql = require('mysql2/promise');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('Testing database connection...\n');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('✓ Database connection successful!\n');

    // Test tables
    const [tables] = await connection.query('SHOW TABLES');
    console.log('Tables found:');
    tables.forEach(table => {
      console.log('  -', Object.values(table)[0]);
    });

    // Test users
    const [users] = await connection.query('SELECT id, name, username, role FROM users');
    console.log('\nUsers in database:');
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.username}) - Role: ${user.role}`);
    });

    // Test categories
    const [categories] = await connection.query('SELECT * FROM categories');
    console.log('\nCategories:');
    categories.forEach(cat => {
      console.log(`  - ${cat.name}`);
    });

    await connection.end();
    console.log('\n✓ All tests passed! Backend is ready to use.');
    
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.log('\nPlease check:');
    console.log('1. MySQL is running');
    console.log('2. Database credentials in .env are correct');
    console.log('3. You have run database.sql in MySQL Workbench');
  }
};

testConnection();
