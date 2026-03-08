const db = require('../config/db');

const getAllUnits = async (req, res) => {
  try {
    const [units] = await db.query('SELECT * FROM units ORDER BY type, name');
    res.json(units);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllUnits };
