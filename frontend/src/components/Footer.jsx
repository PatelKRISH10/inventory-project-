import { theme } from '../theme';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>&copy; 2024 UM Inventory Management System</p>
        <p style={styles.subtext}>Built with ❤️ for Restaurant Management</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    marginTop: 'auto',
    boxShadow: `0 -2px 10px ${theme.colors.shadow}`
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1.5rem',
    textAlign: 'center'
  },
  text: {
    margin: 0,
    fontSize: '0.95rem',
    fontWeight: '500'
  },
  subtext: {
    margin: '0.5rem 0 0 0',
    fontSize: '0.85rem',
    opacity: 0.8
  }
};

export default Footer;
