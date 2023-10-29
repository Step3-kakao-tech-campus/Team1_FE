import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      yellow: string;
      lightYellow: string;
      lightGray: string;
      lightBlue: string;
      gray: string;
      backgroundColor: string;
      textColor: string;
      open: string;
      middle: string;
      close: string;
    };
    fonts: {
      fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
      };
      fontWeight: {
        extraBold: number;
        bold: number;
        semiBold: number;
        regular: number;
        medium: number;
        light: number;
      };
    };
    window: {
      minWidth: string;
      mobileMax: string;
      tabletMax: string;
    };
  }
}
