import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserReducer, clearUserReducer } from 'states/slices/loginSlice';
import { AppDispatch } from 'states/store';
import { convertPath } from 'apis/convertURI';

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const saveLogin = (token: any) => {
    let redirect: string | null = localStorage.getItem('beforeLoginURL');
    if (redirect === null) {
      redirect = '/';
    }

    if (typeof token !== 'string') return;
    dispatch(
      setUserReducer({
        token: token,
        loginTime: Date.now(),
        islogin: true,
      }),
    );

    navigate(convertPath(redirect));
  };

  const logout = () => {
    dispatch(clearUserReducer());
    navigate(convertPath('/'));
  };

  return { saveLogin, logout };
};

export default useLogin;
