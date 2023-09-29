import { postSignin } from 'apis/signin';
import useForm from 'hooks/useForm';
import useLogin from 'hooks/useLogin';
import React, { useState } from 'react';
import signinValidator from 'utils/signinValidator';

const SigninPage = (): JSX.Element => {
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

  const SigninHandler = () => {
    if (isAdmin === null) return;
    postSignin(userInfo.name, isAdmin)
      .then((response) => {
        // 토큰 저장
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

          <button onClick={SigninHandler} disabled={!signinValidator(userInfo)}>
            가입 완료
          </button>
        </div>
      )}
    </div>
  );
};

export default SigninPage;
