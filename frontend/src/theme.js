// Theme configuration with color palette and design tokens
export const theme = {
  colors: {
    primary: '#254F22',
    secondary: '#A03A13',
    accent: '#F5824A',
    background: '#EDE4C2',
    white: '#FFFFFF',
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
      light: '#999999'
    },
    success: '#27ae60',
    danger: '#e74c3c',
    warning: '#f39c12',
    info: '#3498db',
    border: '#d4c5a0',
    shadow: 'rgba(37, 79, 34, 0.1)'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 3px rgba(37, 79, 34, 0.08)',
    md: '0 4px 6px rgba(37, 79, 34, 0.1)',
    lg: '0 10px 15px rgba(37, 79, 34, 0.12)',
    xl: '0 20px 25px rgba(37, 79, 34, 0.15)'
  },
  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '350ms ease'
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px'
  }
};
