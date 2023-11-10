import { convertPath } from 'apis/convertURI';
import { ErrorData } from 'apis/types';
import { stringErrorCode } from 'error/errorCode';
import { loginDatahandlers } from 'utils/loginDatahandlers';

const redirect = (url: string) => {
  window.location.href = url;
};

export const defaultErrorHandler = (error: ErrorData) => {
  console.log('defaultErrorHandler', error);

  if (error.response === undefined) {
    alert('서버 오류');
    loginDatahandlers.removeLoginData();
    return;
  }

  // 서버 에러 응답
  const code = error.response?.data?.error?.errorCode || 0;
  const errorType = stringErrorCode(code);

  switch (errorType) {
    case 'GO_TO_JOIN':
      return;

    case 'INVALID_INVITATION':
      return;

    case 'ALEADY_USER':
      // 이미 가입되었는데 가입 요청
      alert('이미 가입되었습니다');
      redirect(convertPath('/'));
      return;

    case 'ALEADY_HAS_GROUP':
      // 이미 그룹이 있음
      alert('이미 소속된 그룹이 있습니다');
      redirect(convertPath('/'));
      return;

    case 'ALEADY_SCHEDULE_STARTED':
      // 이미 모집 시작되었는데 모집 시작
      alert('해당 주차 모집이 이미 시작되었습니다');
      redirect(convertPath('/newSchedule'));
      return;

    case 'ALEADY_SCHEDULE_FIXED':
      // 이미 모집 마감되었는데 모집 마감
      alert('해당 주차 모집이 이미 마감되었습니다');
      redirect(convertPath('/newSchedule'));
      return;

    case 'FORM_VALIDATION':
      // 폼 validation
      alert(`입력값이 올바르지 않습니다`);
      return;

    case 'TIMEOUT':
      // 타임 아웃
      alert(`일시적인 네트워크 오류가 발생했습니다. 다시 시도하세요`);
      return;

    case 'AUTHENTICATION':
      // 토큰 유효하지 않음
      alert('로그인이 만료되었습니다.');
      loginDatahandlers.removeLoginData();
      redirect(convertPath('/'));
      return;

    case 'AUTHORIZATION':
      // 접근 권한
      alert(`잘못된 접근입니다`);
      loginDatahandlers.removeLoginData();
      redirect(convertPath('/'));
      return;

    default:
      alert(`서버 오류`);
      loginDatahandlers.removeLoginData();
      redirect(convertPath('/'));
      return;
  }
};
