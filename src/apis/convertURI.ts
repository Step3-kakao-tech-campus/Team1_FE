const staticServerUrl_: string = process.env.REACT_APP_PATH || '';
export const apiURL: string = process.env.REACT_APP_API_URL;

export const convertPath = (path: string): string => {
  return staticServerUrl_ + path;
};

export const baseURL = new URL(window.location.href).origin;
