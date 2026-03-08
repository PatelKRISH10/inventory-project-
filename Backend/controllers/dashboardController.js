const db = require('../config/db');

const getDashboard = async (req, res) => {
  try {
    const [totalItems] = await db.query('SELECT COUNT(*) as count FROM items');
    const [totalCategories] = await db.query('SELECT COUNT(*) as count FROM categories');
    const [lowStock] = await db.query(
      'SELECT items.*, categories.name as category_name FROM items JOIN categories ON items.category_id = categories.id WHERE items.quantity <= items.minimum_quantity ORDER BY items.quantity ASC'
    );
    const [recentUpdates] = await db.query(
      'SELECT items.*, categories.name as category_name FROM items JOIN categories ON items.category_id = categories.id ORDER BY items.updated_at DESC LIMIT 10'
    );

    res.json({
      totalItems: totalItems[0].count,
      totalCategories: totalCategories[0].count,
      lowStock,
      recentUpdates
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getDashboard };
