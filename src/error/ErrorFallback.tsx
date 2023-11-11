import { convertPath } from 'apis/convertURI';
import { ErrorFallbackProps } from 'apis/types';
import { stringErrorCode } from 'error/errorCode';
import { useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  console.log('boundary', error);

  const navigate = useNavigate();

  const code = error.response?.data?.error?.errorCode || 0;
  const errorType = stringErrorCode(code);

  if (errorType === 'TIMEOUT')
    return (
      <ErrorPage
        message="time out"
        btnHandler={() => {
          resetErrorBoundary();
        }}
        isNeedLogout={false}
        btnText="다시 시도하기"
      />
    );
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
};

export default ErrorFallback;
