export const saveLoginData = (token: string, userData: UserDataType) => {
  sessionStorage.removeItem('beforeLoginURL');

  const loginData = {
    token: token,
    isLogin: true,
    isAdmin: userData.isAdmin,
  };

  sessionStorage.setItem('login', JSON.stringify(loginData));
};

export const removeLoginData = () => {
  sessionStorage.removeItem('login');
};

const defaultLoginState = {
  isLogin: false,
  token: '',
  isAdmin: false,
};

export const getLoginData = () => {
  const stringData = sessionStorage.getItem('login');
  if (stringData === null) return defaultLoginState;

  return JSON.parse(stringData);
};

interface UserDataType {
  isAdmin: boolean;
}
