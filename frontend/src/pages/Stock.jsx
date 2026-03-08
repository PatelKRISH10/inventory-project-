import { useState, useEffect } from 'react';
import api from '../utils/api';

const Stock = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockAdjustment, setStockAdjustment] = useState({ item: null, type: '', quantity: '', notes: '' });
  const [editItem, setEditItem] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    quantity: '',
    unit_id: '',
    price: '',
    minimum_quantity: ''
  });

  useEffect(() => {
    fetchItems();
    fetchCategories();
    fetchUnits();
  }, [search, filterCategory]);

  const fetchItems = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (filterCategory) params.category = filterCategory;
      const response = await api.get('/items', { params });
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchUnits = async () => {
    try {
      const response = await api.get('/units');
      setUnits(response.data);
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await api.put(`/items/${editItem.id}`, formData);
      } else {
        await api.post('/items', formData);
      }
      setShowModal(false);
      setEditItem(null);
      setFormData({ name: '', category_id: '', quantity: '', unit_id: '', price: '', minimum_quantity: '' });
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
      alert(error.response?.data?.message || 'Error saving item');
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setFormData({
      name: item.name,
      category_id: item.category_id,
      unit_id: item.unit_id,
      price: item.price,
      minimum_quantity: item.minimum_quantity
    });
    setShowModal(true);
  };

  const handleStockAdjust = (item, type) => {
    setStockAdjustment({ item, type, quantity: '', notes: '' });
    setShowStockModal(true);
  };

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/stock/adjust', {
        item_id: stockAdjustment.item.id,
        type: stockAdjustment.type,
        quantity: parseFloat(stockAdjustment.quantity),
        notes: stockAdjustment.notes
      });
      setShowStockModal(false);
      setStockAdjustment({ item: null, type: '', quantity: '', notes: '' });
      fetchItems();
    } catch (error) {
      alert(error.response?.data?.message || 'Error adjusting stock');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/items/${id}`);
        fetchItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Stock Management</h1>
        <button onClick={() => setShowModal(true)} style={styles.addButton}>Add Item</button>
      </div>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={styles.select}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Stock Actions</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Min Quantity</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.category_name}</td>
              <td style={styles.td}>{item.quantity} {item.unit_symbol || ''}</td>
              <td style={styles.td}>
                <button onClick={() => handleStockAdjust(item, 'IN')} style={styles.stockInBtn}>+ Add</button>
                <button onClick={() => handleStockAdjust(item, 'OUT')} style={styles.stockOutBtn}>- Remove</button>
              </td>
              <td style={styles.td}>₹{item.price}</td>
              <td style={styles.td}>{item.minimum_quantity}</td>
              <td style={styles.td}>
                {item.quantity <= item.minimum_quantity ? (
                  <span style={styles.lowStock}>Low Stock</span>
                ) : (
                  <span style={styles.inStock}>In Stock</span>
                )}
              </td>
              <td style={styles.td}>
                <button onClick={() => handleEdit(item)} style={styles.editBtn}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={styles.deleteBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>{editItem ? 'Edit Item' : 'Add Item'}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Item Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={styles.input}
                required
              />
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                style={styles.select}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {!editItem && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Initial Quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    style={{ ...styles.input, flex: 2 }}
                    required
                  />
                  <select
                    value={formData.unit_id}
                    onChange={(e) => setFormData({ ...formData, unit_id: e.target.value })}
                    style={{ ...styles.select, flex: 1 }}
                    required
                  >
                    <option value="">Unit</option>
                    <optgroup label="Weight">
                      {units.filter(u => u.type === 'weight').map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.symbol} - {unit.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Volume">
                      {units.filter(u => u.type === 'volume').map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.symbol} - {unit.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Count">
                      {units.filter(u => u.type === 'count').map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.symbol} - {unit.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              )}
              {editItem && (
                <select
                  value={formData.unit_id}
                  onChange={(e) => setFormData({ ...formData, unit_id: e.target.value })}
                  style={styles.select}
                  required
                >
                  <option value="">Select Unit</option>
                  <optgroup label="Weight">
                    {units.filter(u => u.type === 'weight').map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.symbol} - {unit.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Volume">
                    {units.filter(u => u.type === 'volume').map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.symbol} - {unit.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Count">
                    {units.filter(u => u.type === 'count').map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.symbol} - {unit.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              )}
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                style={styles.input}
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Minimum Quantity"
                value={formData.minimum_quantity}
                onChange={(e) => setFormData({ ...formData, minimum_quantity: e.target.value })}
                style={styles.input}
                required
              />
              <div style={styles.modalActions}>
                <button type="submit" style={styles.saveBtn}>Save</button>
                <button type="button" onClick={() => {
                  setShowModal(false);
                  setEditItem(null);
                  setFormData({ name: '', category_id: '', quantity: '', unit_id: '', price: '', minimum_quantity: '' });
                }} style={styles.cancelBtn}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showStockModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>{stockAdjustment.type === 'IN' ? 'Add Stock' : 'Remove Stock'}</h2>
            <p><strong>Item:</strong> {stockAdjustment.item?.name}</p>
            <p><strong>Current Stock:</strong> {stockAdjustment.item?.quantity} {stockAdjustment.item?.unit_symbol}</p>
            <form onSubmit={handleStockSubmit} style={styles.form}>
              <input
                type="number"
                step="0.01"
                placeholder="Quantity"
                value={stockAdjustment.quantity}
                onChange={(e) => setStockAdjustment({ ...stockAdjustment, quantity: e.target.value })}
                style={styles.input}
                required
                min="0.01"
              />
              <input
                type="text"
                placeholder="Notes (optional)"
                value={stockAdjustment.notes}
                onChange={(e) => setStockAdjustment({ ...stockAdjustment, notes: e.target.value })}
                style={styles.input}
              />
              <div style={styles.modalActions}>
                <button type="submit" style={stockAdjustment.type === 'IN' ? styles.saveBtn : styles.deleteBtn}>
                  {stockAdjustment.type === 'IN' ? 'Add Stock' : 'Remove Stock'}
                </button>
                <button type="button" onClick={() => {
                  setShowStockModal(false);
                  setStockAdjustment({ item: null, type: '', quantity: '', notes: '' });
                }} style={styles.cancelBtn}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  addButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  filters: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  input: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  select: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    minWidth: '200px'
  },
  table: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  th: {
    textAlign: 'left',
    padding: '1rem',
    backgroundColor: '#2c3e50',
    color: 'white',
    fontWeight: 'bold'
  },
  td: {
    padding: '1rem',
    borderBottom: '1px solid #ecf0f1'
  },
  lowStock: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.85rem'
  },
  inStock: {
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.85rem'
  },
  editBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '0.5rem'
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  stockInBtn: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.5rem 0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '0.5rem',
    fontSize: '0.9rem'
  },
  stockOutBtn: {
    backgroundColor: '#e67e22',
    color: 'white',
    border: 'none',
    padding: '0.5rem 0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  modalActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end'
  },
  saveBtn: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  cancelBtn: {
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Stock;
