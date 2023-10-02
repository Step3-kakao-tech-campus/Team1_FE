import { postsignup } from 'apis/signup';
import FlexContainer from 'components/atoms/FlexContainer';

import PageContainer from 'components/atoms/PageContainer';
import SubmitButton from 'components/atoms/SubmitButton';
import useForm from 'hooks/useForm';
import useLogin from 'hooks/useLogin';
import React, { useState } from 'react';
import styled from 'styled-components';
import signupValidator from 'utils/signupValidator';

const signupPage = (): JSX.Element => {
  // // 1. 알바/매니저 선택
  // type adminType = boolean | null;

  // const [isAdmin, setIsAdmin] = useState<adminType>(null);
  // const selectTypeHandler = (isAdminParam: adminType): void => {
  //   setIsAdmin((prev: adminType) => isAdminParam);
  // };

  // 1. 폼 입력 상태 관리
  interface StateType {
    [index: string]: string | boolean | null;
    isAdmin: boolean | null;
    userName: string;
    agreement: boolean;
  }

  const initalInfo: StateType = {
    isAdmin: null,
    userName: '',
    agreement: false,
  };

  const { obj: userInfo, formHandler, toggleHandler, selectOneHandler } = useForm(initalInfo);

  // 2. 로그인 요청 보내기
  const { saveLogin } = useLogin();

  const signupHandler = () => {
    if (userInfo.isAdmin === null) return;
    postsignup(userInfo.userName, userInfo.isAdmin)
      .then((response) => {
        // 로그인, 토큰 저장
        saveLogin(response.headers.authorization, response.data);
      })
      .catch((error) => {
        // 에러 처리
      });
  };

  return (
    <PageContainer gap="36px">
      {/* <div className="w-[300px] h-[300px] bg-black"> 임시 로고 박스 </div> */}
      <FlexContainer direction="row" wFull={true}>
        <p className="align-middle text-xl">가입하기</p>
      </FlexContainer>

      <FlexContainer direction="row" wFull={true} padding="0 40px">
        <Button id="isAdmin" onClick={(e) => selectOneHandler(e, true)} $isSelected={userInfo.isAdmin === true}>
          매니저로 <br /> 시작하기
        </Button>
        <Button id="isAdmin" onClick={(e) => selectOneHandler(e, false)} $isSelected={userInfo.isAdmin === false}>
          알바생으로 <br /> 시작하기
        </Button>
      </FlexContainer>

      {userInfo.isAdmin !== null && (
        <FlexContainer wFull={true} padding="0 40px">
          <FlexContainer wFull={true}>
            <span className="text-center">회원 가입을 위해 추가 정보를 입력해주세요</span>
            <Input id="userName" onChange={formHandler} placeholder="이름" />

            <FlexContainer direction="row" justify="start" padding="0 16px">
              <input id="agreement" onChange={toggleHandler} type="checkbox" />
              <label htmlFor="agreement">약관동의</label>
            </FlexContainer>
          </FlexContainer>

          <SubmitButton onClick={signupHandler} disabled={!signupValidator(userInfo)}>
            가입 완료
          </SubmitButton>
        </FlexContainer>
      )}
    </PageContainer>
  );
};

export default signupPage;

const Input = styled.input`
  background: ${({ theme }) => theme.color.backgroundColor};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 10px 12px;
  border: 1px black;
`;

const Button = styled.button<{ color?: string; $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 10px;

  width: 100%;

  background: ${(props) => (props.$isSelected ? props.theme.color.yellow : props.theme.color.lightBlue)};
  border: 1px solid #000000;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
