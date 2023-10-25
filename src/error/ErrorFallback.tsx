import React from 'react';
import { convertPath } from 'apis/convertURI';
import useLogin from 'hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';

interface Props {
  error: {
    response?: {
      status: number;
    };
    clientError?: boolean;
  };
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: Props) => {
  console.log(error);
  const navigate = useNavigate();
  const { logout } = useLogin('/');

  // 클라이언트에서 throw 된 오류
  if (error.clientError) {
    return (
      <ErrorPage
        message="잘못된 접근입니다"
        btnHandler={() => {
          navigate(convertPath('/'));
          resetErrorBoundary();
        }}
        btnText="메인으로"
      />
    );
  }

  // api 오류도 아니고 클라이언트에서 throw 되지도 않았을 때
  if (error.response === undefined) {
    return (
      <ErrorPage
        message="Something Went Wrong"
        btnHandler={() => {
          navigate(convertPath('/'));
          resetErrorBoundary();
        }}
        btnText="메인으로"
      />
    );
  }

  // api 오류
  const errorCode = error.response?.status as number;
  return (
    <>
      {errorCode >= 500 && (
        <ErrorPage message="서버에러" btnHandler={() => resetErrorBoundary()} btnText="다시 시도하기" />
      )}
      {errorCode === 401 && (
        <ErrorPage
          message="다시 로그인하세요"
          btnHandler={() => {
            logout();
            navigate(convertPath('/'));
            resetErrorBoundary();
          }}
          btnText="메인으로"
        />
      )}
      {(errorCode === 404 || errorCode === 403 || errorCode === 400 || errorCode === 422) && (
        <ErrorPage
          message="잘못된 접근입니다"
          btnHandler={() => {
            navigate(convertPath('/'));
            resetErrorBoundary();
          }}
          btnText="메인으로"
        />
      )}
    </>
  );
};

export default ErrorFallback;
