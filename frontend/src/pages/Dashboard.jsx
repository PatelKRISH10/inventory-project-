import { useState, useEffect } from 'react';
import { theme } from '../theme';
import { cardStyles, badgeStyles } from '../utils/styles';
import api from '../utils/api';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/dashboard');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  };

  if (!data) return <div style={styles.container}><div style={styles.loading}>Loading...</div></div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.subtitle}>Overview of your inventory</p>
      </div>
      
      <div style={styles.statsGrid}>
        <div style={{...styles.statCard, borderLeft: `4px solid ${theme.colors.primary}`}}>
          <p style={styles.statLabel}>Total Items</p>
          <p style={styles.statValue}>{data.totalItems}</p>
        </div>
        <div style={{...styles.statCard, borderLeft: `4px solid ${theme.colors.accent}`}}>
          <p style={styles.statLabel}>Total Categories</p>
          <p style={styles.statValue}>{data.totalCategories}</p>
        </div>
        <div style={{...styles.statCard, borderLeft: `4px solid ${theme.colors.danger}`}}>
          <p style={styles.statLabel}>Low Stock Items</p>
          <p style={{...styles.statValue, color: theme.colors.danger}}>{data.lowStock.length}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>⚠️ Low Stock Alert</h2>
        {data.lowStock.length === 0 ? (
          <p style={styles.emptyState}>All items are well stocked! 🎉</p>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Item</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Current</th>
                  <th style={styles.th}>Required</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.lowStock.map((item) => (
                  <tr key={item.id} style={styles.tr}>
                    <td style={styles.td}>{item.name}</td>
                    <td style={styles.td}>{item.category_name}</td>
                    <td style={{...styles.td, color: theme.colors.danger, fontWeight: '600'}}>{item.quantity}</td>
                    <td style={styles.td}>{item.minimum_quantity}</td>
                    <td style={styles.td}>
                      <span style={{...badgeStyles.base, ...badgeStyles.danger}}>Low Stock</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🔄 Recent Updates</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Item</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {data.recentUpdates.map((item) => (
                <tr key={item.id} style={styles.tr}>
                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{item.category_name}</td>
                  <td style={styles.td}>{item.quantity}</td>
                  <td style={styles.td}>{new Date(item.updated_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    minHeight: 'calc(100vh - 140px)'
  },
  header: {
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2rem',
    color: theme.colors.primary,
    fontWeight: '700',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: theme.colors.text.secondary,
    fontSize: '1rem',
    margin: 0
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: theme.colors.text.secondary
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statCard: {
    ...cardStyles,
    transition: theme.transitions.normal,
    cursor: 'default'
  },
  statLabel: {
    fontSize: '0.9rem',
    color: theme.colors.text.secondary,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '0.75rem',
    margin: 0
  },
  statValue: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: theme.colors.primary,
    lineHeight: 1,
    margin: '0.5rem 0 0 0'
  },
  section: {
    ...cardStyles,
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: '1.5rem',
    paddingBottom: '0.75rem',
    borderBottom: `2px solid ${theme.colors.background}`,
    margin: '0 0 1.5rem 0'
  },
  emptyState: {
    textAlign: 'center',
    padding: '2rem',
    color: theme.colors.text.secondary,
    fontSize: '1.1rem'
  },
  tableContainer: {
    overflowX: 'auto',
    borderRadius: theme.borderRadius.md
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0
  },
  th: {
    textAlign: 'left',
    padding: '1rem 1.25rem',
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: `2px solid ${theme.colors.secondary}`
  },
  td: {
    padding: '1rem 1.25rem',
    borderBottom: `1px solid ${theme.colors.background}`,
    fontSize: '0.95rem',
    color: theme.colors.text.primary
  },
  tr: {
    transition: theme.transitions.fast,
    backgroundColor: theme.colors.white
  }
};

export default Dashboard;
