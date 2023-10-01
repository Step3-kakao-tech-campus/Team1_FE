let staticServerUrl_: string = '';
let apiURL_: string = process.env.REACT_APP_API_URL;

if (process.env.REACT_APP_PATH !== undefined) {
  staticServerUrl_ = process.env.REACT_APP_PATH;
  apiURL_ = process.env.REACT_APP_PATH + '/api';
}

export const convertPath = (path: string): string => {
  return staticServerUrl_ + path;
};

export const apiURL: string = apiURL_;
