import useErrorHandler from 'error/useErrorHandler';
import useLogin from 'pages/auth/hooks/useLogin';
import { useLocation } from 'react-router-dom';

const useSignUpForm = ({ isAdmin, userName }: { isAdmin: boolean | null; userName: string }) => {
  const { wrongPathHandler } = useErrorHandler();
  const state = useLocation().state;
  if (state === null) {
    wrongPathHandler();
  }

  const { signup } = useLogin();
  const code = state.code;

  const signupBtnHandler = () => {
    if (isAdmin === null) {
      wrongPathHandler();
      return;
    }
    signup({
      isAdmin: isAdmin,
      userName: userName,
      code: code,
    });
  };
  return { signupBtnHandler };
};

export default useSignUpForm;
