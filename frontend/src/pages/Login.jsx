import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { theme } from '../theme';
import { buttonStyles, inputStyles } from '../utils/styles';
import api from '../utils/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { username, password });
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <span style={styles.icon}>🍽️</span>
        </div>
        <h1 style={styles.title}>UM Inventory</h1>
        <p style={styles.subtitle}>Restaurant Management System</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Sign In</button>
        </form>
        <p style={styles.hint}>Default: admin / admin123</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
    padding: '2rem'
  },
  card: {
    backgroundColor: theme.colors.white,
    padding: '3rem',
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.xl,
    width: '100%',
    maxWidth: '450px'
  },
  iconContainer: {
    textAlign: 'center',
    marginBottom: '1rem'
  },
  icon: {
    fontSize: '4rem'
  },
  title: {
    textAlign: 'center',
    color: theme.colors.primary,
    marginBottom: '0.5rem',
    fontSize: '2rem',
    fontWeight: '700'
  },
  subtitle: {
    textAlign: 'center',
    color: theme.colors.text.secondary,
    marginBottom: '2rem',
    fontSize: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  input: {
    ...inputStyles,
    padding: '1rem'
  },
  button: {
    ...buttonStyles.base,
    ...buttonStyles.primary,
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: '600'
  },
  error: {
    backgroundColor: '#fee',
    color: theme.colors.danger,
    padding: '1rem',
    borderRadius: theme.borderRadius.md,
    marginBottom: '1rem',
    border: `1px solid ${theme.colors.danger}40`,
    fontSize: '0.9rem'
  },
  hint: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.85rem',
    color: theme.colors.text.secondary
  }
};

export default Login;
