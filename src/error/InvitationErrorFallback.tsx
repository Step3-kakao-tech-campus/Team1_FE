import { convertPath } from 'apis/convertURI';
import { ErrorFallbackProps } from 'apis/types';
import { stringErrorCode } from 'error/errorCode';
import { useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const InvitationErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const navigate = useNavigate();
  const code = error.response?.data?.error.errorCode || 0;
  const errorType = stringErrorCode(code);

  if (errorType === 'INVALID_INVITATION')
    return (
      <ErrorPage
        message="유효하지 않은 초대입니다"
        btnHandler={() => {
          resetErrorBoundary();
          navigate(convertPath('/'));
        }}
        btnText="메인으로"
      />
    );

  throw error;
};
export default InvitationErrorFallback;
