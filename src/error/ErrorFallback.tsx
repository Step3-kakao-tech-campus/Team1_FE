import React from 'react';
import { convertPath } from 'apis/convertURI';
import PageContainer from 'components/@commons/PageContainer';
import useLogin from 'hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';

interface Props {
  error: {
    response: {
      status: number;
    };
  };
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: Props) => {
  const errorCode = error.response.status;
  const navigate = useNavigate();
  const { logout } = useLogin('/');

  return (
    <PageContainer withoutHeader withoutBottonBar gap="60px" padding="60px">
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
    </PageContainer>
  );
};

export default ErrorFallback;
