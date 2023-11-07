const storage: Storage = localStorage;

export const saveLoginData = (token: string, userData: UserDataType) => {
  sessionStorage.removeItem('beforeLoginURL');
  sessionStorage.removeItem('code');

  const loginData = {
    token: token,
    isLogin: true,
    isAdmin: userData.isAdmin,
  };

  storage.setItem('login', JSON.stringify(loginData));
};

export const removeLoginData = () => {
  storage.removeItem('login');
  location.reload();
};

const defaultLoginState = {
  isLogin: false,
  token: '',
  isAdmin: false,
};

export const getLoginData = () => {
  const stringData = storage.getItem('login');
  if (stringData === null) return defaultLoginState;

  return JSON.parse(stringData);
};

interface UserDataType {
  isAdmin: boolean;
}
