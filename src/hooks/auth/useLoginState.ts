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
    loginDatahandlers.saveLoginData(token, userData);
    navigate(convertPath(sessionStorage.getItem('beforeLoginURL') || '/'));
  };

  return { afterLogin };
};
