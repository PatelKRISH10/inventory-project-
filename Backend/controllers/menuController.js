const db = require('../config/db');

const getMenu = async (req, res) => {
  try {
    const [menu] = await db.query('SELECT * FROM weekly_menu ORDER BY FIELD(day, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"), FIELD(session, "lunch", "dinner")');
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateMenu = async (req, res) => {
  try {
    const { id, sabji1, sabji2 } = req.body;

    await db.query(
      'UPDATE weekly_menu SET sabji1 = ?, sabji2 = ? WHERE id = ?',
      [sabji1, sabji2, id]
    );

    res.json({ message: 'Menu updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getMenu, updateMenu };
