import React from 'react';
import { convertPath } from 'apis/convertURI';
import { Navigate, useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { ErrorData } from 'apis/types';
import { AdminNoGroupPage, AdminNoMemberPage } from 'pages/admin/ETCMainPage';
import { AlbaNoGroupPage } from 'pages/alba/AlbaMainIndex';
import { getLoginData, removeLoginData } from 'utils/loginDatahandlers';

interface Props {
  error: ErrorData;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: Props) => {
  console.log(error);

  const navigate = useNavigate();
  const isAdmin = getLoginData().isAdmin;

  if (error.response === undefined || error.name === 'clientError') {
    // 통신 오류가 아님
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

  const code = error.response?.data?.code as number;

  switch (code) {
    case -10000:
      // 타임 아웃
      return <ErrorPage message="서버 에러" btnHandler={() => resetErrorBoundary()} btnText="다시 시도하기" />;

    case -20001:
      // 이미 그룹이 있는데 초대 접속
      alert('이미 소속된 그룹이 있습니다');
      return <Navigate to={convertPath('/')} />;

    case -20002:
      // 이미 모집 시작됨
      alert('해당 주차 모집이 이미 시작되었습니다');
      return <Navigate to={convertPath('/newSchedule')} />;

    case -20003:
      // 이미 모집 마감
      alert('해당 주차 모집이 이미 마감되었습니다');
      return <Navigate to={convertPath('/newSchedule')} />;

    case -20004:
      // 유효하지 않은 초대
      return <ErrorPage message="유효하지 않은 초대입니다" goMain />;

    case -21000:
      // 토큰 유효하지 않음
      resetErrorBoundary();
      removeLoginData();
      alert('로그인이 만료되었습니다. 다시 로그인 해주세요.');
      return <Navigate to={convertPath('/')} />;

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
