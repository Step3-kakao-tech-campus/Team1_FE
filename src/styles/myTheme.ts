import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
  color: {
    yellow: '#FFDF39',
    lightYellow: '#FFF3B2',
    lightGray: '#F2F2F2',
    lightBlue: '#D8F2FF',
    gray: '#BEBEBE',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    open: '#DEFFE1',
    middle: '#FFEACB',
    close: '#DDE7FF',
  },
  fonts: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
      xxxl: '2rem',
    },
    fontWeight: {
      extraBold: 800,
      bold: 700,
      semiBold: 600,
      medium: 500,
      regular: 400,
      light: 300,
    },
  },
};

export { myTheme };
