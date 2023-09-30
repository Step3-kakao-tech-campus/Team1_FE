import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      backgrounds: string;
    };
    fonts: {
      fontSize: string;
      fontWeight: number;
    };
  }
}
