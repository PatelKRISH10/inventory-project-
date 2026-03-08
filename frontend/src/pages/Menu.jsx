import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const Menu = () => {
  const { user } = useContext(AuthContext);
  const [menu, setMenu] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({ sabji1: '', sabji2: '' });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await api.get('/menu');
      setMenu(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setFormData({ sabji1: item.sabji1, sabji2: item.sabji2 });
  };

  const handleSave = async () => {
    try {
      await api.put('/menu', { id: editItem.id, ...formData });
      setEditItem(null);
      fetchMenu();
    } catch (error) {
      console.error('Error updating menu:', error);
    }
  };

  const groupedMenu = menu.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = [];
    acc[item.day].push(item);
    return acc;
  }, {});

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div style={styles.container}>
      <h1>Weekly Menu</h1>
      
      {days.map((day) => (
        <div key={day} style={styles.dayCard}>
          <h2 style={styles.dayTitle}>{day}</h2>
          {groupedMenu[day]?.map((item) => (
            <div key={item.id} style={styles.session}>
              <div style={styles.sessionHeader}>
                <h3 style={styles.sessionTitle}>{item.session.toUpperCase()}</h3>
                {user?.role === 'admin' && editItem?.id !== item.id && (
                  <button onClick={() => handleEdit(item)} style={styles.editBtn}>Edit</button>
                )}
              </div>
              
              {editItem?.id === item.id ? (
                <div style={styles.editForm}>
                  <input
                    type="text"
                    value={formData.sabji1}
                    onChange={(e) => setFormData({ ...formData, sabji1: e.target.value })}
                    style={styles.input}
                    placeholder="Sabji 1"
                  />
                  <input
                    type="text"
                    value={formData.sabji2}
                    onChange={(e) => setFormData({ ...formData, sabji2: e.target.value })}
                    style={styles.input}
                    placeholder="Sabji 2"
                  />
                  <div style={styles.editActions}>
                    <button onClick={handleSave} style={styles.saveBtn}>Save</button>
                    <button onClick={() => setEditItem(null)} style={styles.cancelBtn}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div style={styles.sabjiList}>
                  <div style={styles.sabji}>🍛 {item.sabji1}</div>
                  <div style={styles.sabji}>🍛 {item.sabji2}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  dayCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '1.5rem'
  },
  dayTitle: {
    color: '#2c3e50',
    borderBottom: '2px solid #3498db',
    paddingBottom: '0.5rem',
    marginBottom: '1rem'
  },
  session: {
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#ecf0f1',
    borderRadius: '4px'
  },
  sessionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  sessionTitle: {
    color: '#7f8c8d',
    margin: 0,
    fontSize: '1rem'
  },
  sabjiList: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  sabji: {
    backgroundColor: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  editBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  editActions: {
    display: 'flex',
    gap: '0.5rem'
  },
  saveBtn: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  cancelBtn: {
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Menu;
