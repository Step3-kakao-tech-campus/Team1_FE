import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserReducer, clearUserReducer } from 'states/slices/loginSlice';
import { AppDispatch } from 'states/store';
import { convertPath } from 'apis/convertURI';
import { postsignup } from 'apis/signup';
import { postLogin } from 'apis/login';

interface UserDataType {
  userName: string;
  groupName: string;
  isAdmin: boolean;
}

interface UserGetBySignup {
  userName: string;
  isAdmin: boolean | null;
}

const useLogin = (redirectPage?: string) => {
  const loginBtnHandler = (): void => {
    if (redirectPage === undefined) return;
    localStorage.setItem('beforeLoginURL', redirectPage);
    location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  };

  const signup = (userInfo: UserGetBySignup): void => {
    if (userInfo.isAdmin === null) return;
    postsignup(userInfo.userName, userInfo.isAdmin)
      .then((response) => {
        // 로그인, 토큰 저장
        saveLogin(response.headers.authorization, response.data);
      })
      .catch((error) => {
        // 에러 처리
      });
  };

  const login = (code: string) => {
    postLogin(code)
      .then((response) => {
        // 회원일 경우 로그인
        saveLogin(response.headers.authorization, response.data);
      })
      .catch((error) => {
        // 비회원일 경우
        if (error.response && error.response.status === 404) {
          // 회원가입 처리를 하러 간다.
          navigate('/signup');
        }
      });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const saveLogin = (token: string, userData: UserDataType) => {
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
        userData: userData,
      }),
    );

    navigate(convertPath(redirect));
  };

  const logout = () => {
    dispatch(clearUserReducer());
    navigate(convertPath('/'));
  };

  return { logout, signup, login, loginBtnHandler };
};

export default useLogin;
