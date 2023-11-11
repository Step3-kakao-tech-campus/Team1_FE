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
    case 'TIMEOUT':
      // 타임아웃
      alert('연결이 지연되었습니다. 다시 시도하세요');
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

    default:
      // 처리 불가능 에러
      alert('서버 오류');
      loginDatahandlers.removeLoginData();
      redirect(convertPath('/'));
      return;
  }
};
