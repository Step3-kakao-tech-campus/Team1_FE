/// <reference types="react-scripts" />
declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_BASE_URL: string;
    REACT_APP_KAKAO_API_KEY: string;
    REACT_APP_KAKAO_REDIRECT_URI: string;
  }
}
