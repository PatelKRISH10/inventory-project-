const db = require('../config/db');

const getAllItems = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = `SELECT items.*, categories.name as category_name, units.symbol as unit_symbol, units.name as unit_name 
      FROM items 
      JOIN categories ON items.category_id = categories.id
      LEFT JOIN units ON items.unit_id = units.id`;
    const params = [];

    if (search || category) {
      query += ' WHERE';
      if (search) {
        query += ' items.name LIKE ?';
        params.push(`%${search}%`);
      }
      if (category) {
        if (search) query += ' AND';
        query += ' items.category_id = ?';
        params.push(category);
      }
    }

    query += ' ORDER BY items.updated_at DESC';

    const [items] = await db.query(query, params);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, category_id, quantity, unit_id, price, minimum_quantity } = req.body;

    // Validate unit_id
    if (!unit_id) {
      return res.status(400).json({ message: 'Unit is required' });
    }

    const [units] = await db.query('SELECT id FROM units WHERE id = ?', [unit_id]);
    if (units.length === 0) {
      return res.status(400).json({ message: 'Invalid unit selected' });
    }

    const [result] = await db.query(
      'INSERT INTO items (name, category_id, quantity, unit_id, price, minimum_quantity) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category_id, quantity, unit_id, price, minimum_quantity]
    );

    res.status(201).json({ message: 'Item created successfully', id: result.insertId });
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ message: 'Invalid unit or category selected' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category_id, unit_id, price, minimum_quantity } = req.body;

    // Validate unit_id if provided
    if (unit_id) {
      const [units] = await db.query('SELECT id FROM units WHERE id = ?', [unit_id]);
      if (units.length === 0) {
        return res.status(400).json({ message: 'Invalid unit selected' });
      }
    }

    // Note: quantity is NOT updated here - use stock adjustment API instead
    await db.query(
      'UPDATE items SET name = ?, category_id = ?, unit_id = ?, price = ?, minimum_quantity = ? WHERE id = ?',
      [name, category_id, unit_id, price, minimum_quantity, id]
    );

    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ message: 'Invalid unit or category selected' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM items WHERE id = ?', [id]);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllItems, createItem, updateItem, deleteItem };
