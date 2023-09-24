import { postSignin } from 'apis/join';
import useLogin from 'hooks/useLogin';
import React, { useState } from 'react';

const SigninPage = (): JSX.Element => {
  interface StateType {
    [index: string]: string | boolean;
    name: string;
    agreement: boolean;
  }

  const [userInfo, setUserInfo] = useState<StateType>({
    name: '',
    agreement: false,
  });

  const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newObj = { ...userInfo, [event.target.id]: event.target.value };
    setUserInfo((prev: StateType) => newObj);
  };

  const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newObj = { ...userInfo, [event.target.id]: !userInfo[event.target.id] };
    setUserInfo((prev: StateType) => newObj);
  };

  const { login } = useLogin();

  const SigninHandler = () => {
    postSignin(userInfo.name)
      .then((response) => {
        login('토큰');
      })
      .catch((error) => {
        // 에러 처리
      });
  };

  return (
    <div>
      <div>
        <label htmlFor="name">이름을 입력하세요</label>
        <input id="name" onChange={formHandler} />
      </div>
      <div>
        <input id="agreement" onChange={checkboxHandler} type="checkbox" />
        <label htmlFor="name">약관동의</label>
      </div>
      <button onClick={SigninHandler} disabled={userInfo.name.length < 2 || userInfo.agreement != true}>
        가입 완료
      </button>
    </div>
  );
};

export default SigninPage;
