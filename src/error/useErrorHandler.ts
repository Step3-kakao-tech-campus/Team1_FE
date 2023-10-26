import { convertPath } from 'apis/convertURI';
import { ErrorData } from 'apis/types';
import react from 'react';
import { useNavigate } from 'react-router-dom';
import { removeLoginData } from 'utils/loginDatahandlers';

const useErrorHandler = () => {
  const navigate = useNavigate();

  const apiErrorHandler = (error: ErrorData) => {
    if (error.response === undefined) {
      alert('서버와의 연결이 끊어졌습니다. 다시 시도하세요');
      return;
    }

    // 서버 에러 응답
    const code = error.response.status;
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

      case -21000:
        // 토큰 유효하지 않음
        alert('로그인이 만료되었습니다.');
        removeLoginData();
        navigate(convertPath('/'));
        return;

      default:
        alert(`잘못된 접근입니다`);
        navigate(convertPath('/'));
        return;
    }
  };

  return { apiErrorHandler };
};

export default useErrorHandler;
