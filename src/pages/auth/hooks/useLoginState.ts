import { convertPath } from 'apis/convertURI';
import { useNavigate } from 'react-router-dom';
import { loginDatahandlers } from 'utils/loginDatahandlers';

export const useLoginState = () => {
  const navigate = useNavigate();
  const afterLogin = (
    token: string,
    userData: {
      isAdmin: boolean;
    },
  ) => {
    const redirect = sessionStorage.getItem('beforeLoginURL') || '';
    loginDatahandlers.saveLoginData(token, userData);
    navigate(convertPath(redirect));

    sessionStorage.removeItem('beforeLoginURL');
    sessionStorage.removeItem('code');
  };

  return { afterLogin };
};
