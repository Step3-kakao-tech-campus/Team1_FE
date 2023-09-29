import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserReducer, clearUserReducer } from 'states/slices/loginSlice';
import { AppDispatch } from 'states/store';

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const saveLogin = (token: any) => {
    if (typeof token !== 'string') return;
    dispatch(
      setUserReducer({
        token: token,
        loginTime: Date.now(),
        islogin: true,
      }),
    );
    navigate('/');
  };

  const logout = () => {
    dispatch(clearUserReducer());
    navigate('/');
  };

  return { saveLogin, logout };
};

export default useLogin;
