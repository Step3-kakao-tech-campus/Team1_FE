import useLogin from 'hooks/useLogin';
import { useLocation } from 'react-router-dom';

const useSignUpForm = ({ isAdmin, userName }: { isAdmin: boolean | null; userName: string }) => {
  const { signup } = useLogin();

  const state = useLocation().state;
  if (state === null) {
    throw { name: 'clientError' };
  }
  const code = state.code;

  const signupBtnHandler = () => {
    if (isAdmin === null) {
      throw { name: 'clientError' };
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
