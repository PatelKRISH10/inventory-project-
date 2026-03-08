import { theme } from '../theme';

export const buttonStyles = {
  base: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: theme.borderRadius.md,
    fontSize: '0.95rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: theme.transitions.normal,
    boxShadow: theme.shadows.sm,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  primary: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.white
  },
  accent: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.white
  },
  success: {
    backgroundColor: theme.colors.success,
    color: theme.colors.white
  },
  danger: {
    backgroundColor: theme.colors.danger,
    color: theme.colors.white
  },
  outline: {
    backgroundColor: 'transparent',
    color: theme.colors.primary,
    border: `2px solid ${theme.colors.primary}`
  },
  small: {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem'
  },
  large: {
    padding: '1rem 2rem',
    fontSize: '1.05rem'
  }
};

export const cardStyles = {
  backgroundColor: theme.colors.white,
  borderRadius: theme.borderRadius.lg,
  padding: theme.spacing.xl,
  boxShadow: theme.shadows.md,
  transition: theme.transitions.normal
};

export const inputStyles = {
  padding: '0.75rem',
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.borderRadius.md,
  fontSize: '1rem',
  backgroundColor: theme.colors.white,
  transition: theme.transitions.fast,
  outline: 'none'
};

export const badgeStyles = {
  base: {
    padding: '0.35rem 0.75rem',
    borderRadius: theme.borderRadius.full,
    fontSize: '0.85rem',
    fontWeight: '500',
    display: 'inline-block'
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724'
  },
  danger: {
    backgroundColor: '#f8d7da',
    color: '#721c24'
  },
  warning: {
    backgroundColor: '#fff3cd',
    color: '#856404'
  },
  info: {
    backgroundColor: '#d1ecf1',
    color: '#0c5460'
  }
};
