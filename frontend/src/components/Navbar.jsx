import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { theme } from '../theme';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <div style={styles.logoIcon}>🍽️</div>
          <h2 style={styles.logo}>UM Inventory</h2>
        </div>

        <button 
          style={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <div style={{
          ...styles.links,
          ...(mobileMenuOpen ? styles.linksMobile : {})
        }}>
          <Link 
            to="/dashboard" 
            style={{
              ...styles.link,
              ...(isActive('/dashboard') ? styles.linkActive : {})
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/stock" 
            style={{
              ...styles.link,
              ...(isActive('/stock') ? styles.linkActive : {})
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Stock
          </Link>
          <Link 
            to="/menu" 
            style={{
              ...styles.link,
              ...(isActive('/menu') ? styles.linkActive : {})
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Menu
          </Link>
          {user?.role === 'admin' && (
            <Link 
              to="/users" 
              style={{
                ...styles.link,
                ...(isActive('/users') ? styles.linkActive : {})
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Users
            </Link>
          )}
          <div style={styles.userSection}>
            <span style={styles.user}>
              <span style={styles.userName}>{user?.name}</span>
              <span style={styles.userRole}>{user?.role}</span>
            </span>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: theme.colors.primary,
    boxShadow: theme.shadows.md,
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1.5rem',
    minHeight: '70px'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  logoIcon: {
    fontSize: '1.75rem'
  },
  logo: {
    margin: 0,
    color: theme.colors.white,
    fontSize: '1.5rem',
    fontWeight: '600',
    letterSpacing: '-0.5px'
  },
  mobileToggle: {
    display: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    color: theme.colors.white,
    fontSize: '1.5rem',
    padding: '0.5rem',
    cursor: 'pointer',
    '@media (max-width: 768px)': {
      display: 'block'
    }
  },
  links: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  linksMobile: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '70px',
    left: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    padding: '1rem',
    boxShadow: theme.shadows.lg,
    gap: '0.5rem'
  },
  link: {
    color: theme.colors.white,
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.65rem 1.25rem',
    borderRadius: theme.borderRadius.md,
    transition: theme.transitions.fast,
    fontSize: '0.95rem'
  },
  linkActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    fontWeight: '600'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginLeft: '1rem',
    paddingLeft: '1rem',
    borderLeft: '1px solid rgba(255, 255, 255, 0.2)'
  },
  user: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.15rem'
  },
  userName: {
    color: theme.colors.white,
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  userRole: {
    color: theme.colors.accent,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: '0.5px'
  },
  button: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.white,
    border: 'none',
    padding: '0.6rem 1.25rem',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.9rem',
    boxShadow: theme.shadows.sm,
    transition: theme.transitions.normal
  }
};

export default Navbar;
