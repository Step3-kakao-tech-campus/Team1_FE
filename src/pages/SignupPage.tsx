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
    <>
      {isAdmin === null ? (
        <PageContainer gap="36px">
          <div className="w-[300px] h-[300px] bg-black"> 임시 로고 박스 </div>
          <FlexContainer direction="row" wFull={true}>
            <p className="align-middle text-xl">업장에서 본인의 역할을 선택해주세요</p>
          </FlexContainer>
          <FlexContainer direction="row" wFull={true} padding="0 60px">
            <Button id="admin" onClick={() => selectTypeHandler(true)} color="lightGray">
              매니저로 <br /> 시작하기
            </Button>
            <Button id="employee" onClick={() => selectTypeHandler(false)}>
              알바생으로 <br /> 시작하기
            </Button>
          </FlexContainer>
        </PageContainer>
      ) : (
        <PageContainer>
          <FlexContainer wFull={true} padding="0 40px">
            <FlexContainer wFull={true}>
              <span className="text-center">
                회원 가입을 위해 <br /> 추가 정보를 입력해주세요
              </span>
              <Input className="border border-black" id="name" onChange={formHandler} placeholder="이름" />

              <FlexContainer direction="row" justify="start" padding="0 16px">
                <input id="agreement" onChange={toggleHandler} type="checkbox" />
                <label htmlFor="agreement">약관동의</label>
              </FlexContainer>
            </FlexContainer>
            <SubmitButton onClick={signupHandler} disabled={!signupValidator(userInfo)}>
              가입 완료
            </SubmitButton>
          </FlexContainer>
        </PageContainer>
      )}
    </>
  );
};

export default signupPage;

const Input = styled.input`
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 10px 12px;
`;

const Button = styled.button<{ color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 56px 10px;

  width: 100%;

  background: ${(props) =>
    props.color && props.color === 'lightGray' ? props.theme.color.lightGray : props.theme.color.lightBlue};
  border: 1px solid #000000;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
