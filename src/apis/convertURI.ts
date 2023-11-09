const staticServerUrl_: string = process.env.REACT_APP_PATH || '';

export const convertPath = (path: string): string => {
  return staticServerUrl_ + path;
};

export const baseURL = process.env.REACT_APP_BASE_URL || new URL(window.location.href).origin;
export const apiURL: string = process.env.REACT_APP_API_URL || baseURL + '/api';
