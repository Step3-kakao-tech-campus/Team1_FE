import { convertPath } from 'apis/convertURI';
import { ErrorFallbackProps } from 'apis/types';
import { useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  console.log('boundary', error);

  const navigate = useNavigate();

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
