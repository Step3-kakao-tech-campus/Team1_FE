import { convertPath } from 'apis/convertURI';
import { ErrorFallbackProps } from 'apis/types';
import { stringErrorCode } from 'error/errorCode';
import { useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  console.log(error);

  const navigate = useNavigate();
  const code = error.response?.data?.error.errorCode || 0;
  const errorType = stringErrorCode(code);

  switch (errorType) {
    case 'TIMEOUT':
      return <ErrorPage message="서버 에러" btnHandler={() => resetErrorBoundary()} btnText="다시 시도하기" />;

    default:
      return (
        <ErrorPage
          message="Something Went Wrong"
          btnHandler={() => {
            resetErrorBoundary();
            navigate(convertPath('/'));
          }}
          btnText="메인으로"
        />
      );
  }
};

export default ErrorFallback;
