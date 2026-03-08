const db = require('../config/db');

const adjustStock = async (req, res) => {
  let connection;
  
  try {
    const { item_id, type, quantity, notes } = req.body;
    const userId = req.user.id;

    // Validation
    if (!item_id || !type || !quantity) {
      return res.status(400).json({ message: 'Item, type, and quantity are required' });
    }

    if (!['IN', 'OUT'].includes(type)) {
      return res.status(400).json({ message: 'Type must be IN or OUT' });
    }

    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: 'Quantity must be a positive number' });
    }

    // Get connection from pool
    connection = await db.getConnection();
    await connection.beginTransaction();

    // Get current item
    const [items] = await connection.query('SELECT * FROM items WHERE id = ?', [item_id]);
    if (items.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Item not found' });
    }

    const item = items[0];
    const previousQuantity = parseFloat(item.quantity);
    let newQuantity;

    if (type === 'IN') {
      newQuantity = previousQuantity + qty;
    } else {
      newQuantity = previousQuantity - qty;
      if (newQuantity < 0) {
        await connection.rollback();
        return res.status(400).json({ 
          message: `Insufficient stock. Available: ${previousQuantity}, Requested: ${qty}` 
        });
      }
    }

    // Update item quantity
    await connection.query('UPDATE items SET quantity = ? WHERE id = ?', [newQuantity, item_id]);

    // Create transaction record
    await connection.query(
      'INSERT INTO stock_transactions (item_id, type, quantity, previous_quantity, new_quantity, notes, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [item_id, type, qty, previousQuantity, newQuantity, notes || null, userId]
    );

    await connection.commit();

    res.json({
      message: 'Stock updated successfully',
      previousQuantity,
      newQuantity,
      type
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error('Stock adjustment error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const { item_id } = req.params;

    const [transactions] = await db.query(
      `SELECT st.*, u.name as created_by_name, i.name as item_name
       FROM stock_transactions st
       LEFT JOIN users u ON st.created_by = u.id
       LEFT JOIN items i ON st.item_id = i.id
       WHERE st.item_id = ?
       ORDER BY st.created_at DESC
       LIMIT 50`,
      [item_id]
    );

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { adjustStock, getTransactionHistory };
