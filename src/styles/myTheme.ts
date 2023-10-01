import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
  color: {
    yellow: '#FFDF39',
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
      xs: '0.5rem',
      sm: '0.75rem',
      base: '1rem',
      md: '1.25rem',
      lg: '1.5rem',
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
