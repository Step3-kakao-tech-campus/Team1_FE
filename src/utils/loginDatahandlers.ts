class LoginData {
  saveLoginData = (token: string, userData: UserDataType) => {
    sessionStorage.removeItem('beforeLoginURL');
    sessionStorage.removeItem('code');

    const loginData = {
      token: token,
      isLogin: true,
      isAdmin: userData.isAdmin,
    };

    storage.setItem('login', JSON.stringify(loginData));
    return;
  };

  removeLoginData = () => {
    storage.removeItem('login');
    location.reload();
    return;
  };

  getLoginData = (): LoginStateData => {
    const stringData = storage.getItem('login');
    if (stringData === null) return defaultLoginState;
    return JSON.parse(stringData);
  };
}

export const loginDatahandlers = new LoginData();

const storage: Storage = localStorage;

const defaultLoginState = {
  isLogin: false,
  token: '',
  isAdmin: false,
};

interface UserDataType {
  isAdmin: boolean;
}

interface LoginStateData {
  isLogin: boolean;
  token: string;
  isAdmin: boolean;
}
