import { convertPath } from 'apis/convertURI';
import { ErrorFallbackProps } from 'apis/types';
import { AdminNoGroupPage, AdminNoMemberPage } from 'pages/admin/ETCMainPage';
import { AlbaNoGroupPage } from 'pages/alba/AlbaMainIndex';
import { useNavigate } from 'react-router-dom';
import { loginDatahandlers } from 'utils/loginDatahandlers';
import ErrorPage from './ErrorPage';

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  console.log(error);

  const navigate = useNavigate();
  const isAdmin = loginDatahandlers.getLoginData().isAdmin;
  const code = error.response?.data?.errorCode || 0;

  switch (code) {
    case -10000:
      // 타임 아웃
      return <ErrorPage message="서버 에러" btnHandler={() => resetErrorBoundary()} btnText="다시 시도하기" />;

    case -20004:
      // 유효하지 않은 초대
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

    case -21001:
      // 그룹 없음 : no group page
      return <>{isAdmin ? <AdminNoGroupPage /> : <AlbaNoGroupPage />}</>;

    case -21002:
      // 멤버 없음 : no member page
      return <>{isAdmin ? <AdminNoMemberPage /> : <AlbaNoGroupPage />}</>;

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
