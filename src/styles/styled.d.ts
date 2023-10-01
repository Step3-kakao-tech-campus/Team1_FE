import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      yellow: string;
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
        md: string;
        lg: string;
      };
      fontWeight: {
        extraBold: number;
        bold: number;
        reguler: number;
        thin: number;
      };
    };
  }
}
