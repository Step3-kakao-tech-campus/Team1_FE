import { convertPath } from 'apis/convertURI';
import { ErrorData } from 'apis/types';
import { removeLoginData } from 'utils/loginDatahandlers';

export const defaultErrorHandler = (error: ErrorData) => {
  console.log('defaultErrorHandler', error);

  const redirect = (url: string) => {
    window.location.href = url;
  };

  if (error.response === undefined) {
    alert('서버 오류');
    return;
  }

  // 서버 에러 응답
  console.log('defaultErrorHandler', error.response?.data);
  const code = error.response.data?.code;
  switch (code) {
    case -10000:
      // 타임 아웃
      alert(`일시적인 네트워크 오류가 발생했습니다. 다시 시도하세요`);
      return;

    case -10001:
      // 알 수 없는 오류
      alert(`서버 오류`);
      return;

    case -10005:
      // 폼 validation
      alert(`입력값이 올바르지 않습니다`);
      return;

    case -10007:
      // 카카오 oauth api 오류
      alert(`서버 오류`);
      return;

    case -20000:
      // 이미 가입되었는데 가입 요청
      alert('이미 가입되었습니다');
      redirect(convertPath('/'));
      return;

    case -20001:
      // 이미 그룹이 있음
      alert('이미 소속된 그룹이 있습니다');
      redirect(convertPath('/'));
      return;

    case -20002:
      // 이미 모집 시작되었는데 모집 시작
      alert('해당 주차 모집이 이미 시작되었습니다');
      redirect(convertPath('/newSchedule'));
      return;

    case -20003:
      // 이미 모집 마감되었는데 모집 마감
      alert('해당 주차 모집이 이미 마감되었습니다');
      redirect(convertPath('/newSchedule'));
      return;

    case -21000:
      // 토큰 유효하지 않음
      alert('로그인이 만료되었습니다.');
      removeLoginData();
      redirect(convertPath('/'));
      return;

    default:
      alert(`잘못된 접근입니다`);
      redirect(convertPath('/'));
      return;
  }
};
