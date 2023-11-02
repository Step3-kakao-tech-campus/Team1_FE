import { useNavigate } from 'react-router-dom';
import { postsignup, postLogin, SignupRequest } from 'apis/auth';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
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
        if (error.response && error.response.status === 404) {
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
        afterLogin(response.headers.authorization, response.data);
      },
    },
  );

  // 회원가입 요청
  const { mutate: signupMutate } = useMutation(
    ['postRecommends'],
    (requestBody: SignupRequest) => postsignup(requestBody),
    {
      onSuccess: (response) => {
        afterLogin(response.headers.authorization, response.data);
      },
    },
  );
  return { loginMutate, signupMutate };
};
