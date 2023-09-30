import { postsignup } from 'apis/signup';
import useForm from 'hooks/useForm';
import useLogin from 'hooks/useLogin';
import React, { useState } from 'react';
import signupValidator from 'utils/signupValidator';

const signupPage = (): JSX.Element => {
  // 1. 알바/매니저 선택
  type adminType = boolean | null;

  const [isAdmin, setIsAdmin] = useState<adminType>(null);
  const selectTypeHandler = (isAdminParam: adminType): void => {
    setIsAdmin((prev: adminType) => isAdminParam);
  };

  // 2. 폼 입력 상태 관리
  interface StateType {
    [index: string]: string | boolean;
    name: string;
    agreement: boolean;
  }

  const initalInfo: StateType = {
    name: '',
    agreement: false,
  };

  const { obj: userInfo, formHandler, toggleHandler } = useForm(initalInfo);

  // 3. 로그인 요청 관리
  const { saveLogin } = useLogin();

  const signupHandler = () => {
    if (isAdmin === null) return;
    postsignup(userInfo.name, isAdmin)
      .then((response) => {
        // 로그인, 토큰 저장
        saveLogin(response);
      })
      .catch((error) => {
        // 에러 처리
      });
  };

  return (
    <div>
      {isAdmin === null ? (
        <>
          <button id="admin" onClick={() => selectTypeHandler(true)}>
            매니저
          </button>
          <button id="employee" onClick={() => selectTypeHandler(false)}>
            알바생
          </button>
        </>
      ) : (
        <div>
          <div>
            <label htmlFor="name">이름을 입력하세요</label>
            <input id="name" onChange={formHandler} />
          </div>
          <div>
            <input id="agreement" onChange={toggleHandler} type="checkbox" />
            <label htmlFor="name">약관동의</label>
          </div>

          <button onClick={signupHandler} disabled={!signupValidator(userInfo)}>
            가입 완료
          </button>
        </div>
      )}
    </div>
  );
};

export default signupPage;
