import { useMutation } from '@tanstack/react-query';
import { SignupRequest, postLogin, postsignup } from 'apis/auth';
import { useNavigate } from 'react-router-dom';
import { useLoginState } from './useLoginState';

export const useLoginFetch = () => {
  const navigate = useNavigate();
  const { afterLogin } = useLoginState();

  // 로그인 요청
  const { mutate: loginMutate } = useMutation(
    ['postLogin'],
    (code: string) =>
      postLogin({ code: code }).catch((error) => {
        // 비회원일 경우
        if (error.response && error.response.data.error.errorCode === -10006) {
          // 회원가입 처리를 하러 간다.
          navigate('/signup', { state: { code: code } });
          return null;
        } else {
          throw error;
        }
      }),
    {
      onSuccess: (response) => {
        if (response === null) return;
        afterLogin(response.token, { isAdmin: response.isAdmin });
      },
    },
  );

  // 회원가입 요청
  const { mutate: signupMutate } = useMutation(
    ['postsignup'],
    (requestBody: SignupRequest) => postsignup(requestBody),
    {
      onSuccess: (response) => {
        afterLogin(response.token, { isAdmin: response.isAdmin });
      },
    },
  );
  return { loginMutate, signupMutate };
};
