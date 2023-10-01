import { postsignup } from 'apis/signup';
import MainContainer from 'components/atoms/MainContainer';
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
    <PageContainer>
      {isAdmin === null ? (
        <MainContainer gap="40px">
          <div className="w-[300px] h-[300px]  bg-black"> 로고 </div>
          <div>
            <p className="align-middle">업장에서 본인의 역할을 골라주세요</p>
          </div>
          <Container>
            <Button id="admin" onClick={() => selectTypeHandler(true)} color="lightGray">
              매니저
            </Button>
            <Button id="employee" onClick={() => selectTypeHandler(false)}>
              알바생
            </Button>
          </Container>
        </MainContainer>
      ) : (
        <MainContainer>
          <SectionContainer>
            <div className="flex flex-col w-full items-stretch gap-3">
              <label htmlFor="name">회원 가입을 위해 추가 정보를 입력해주세요 </label>
              <input className="border border-black" id="name" onChange={formHandler} />
            </div>
            <div className="flex flex-row w-full">
              <input id="agreement" onChange={toggleHandler} type="checkbox" />
              <label htmlFor="agreement">약관동의</label>
            </div>

            <SubmitButton onClick={signupHandler} disabled={!signupValidator(userInfo)}>
              가입 완료
            </SubmitButton>
          </SectionContainer>
        </MainContainer>
      )}
    </PageContainer>
  );
};

export default signupPage;

const Input = styled.input`
  border: 1;
`;

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 30px 4px;
  gap: 32px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  gap: 24px;
  max-height: 10rem;
`;

const Button = styled.button<{ color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  width: 100%;
  height: 100%;

  background: ${(props) => (props.color === 'lightGray' ? props.theme.color.lightGray : props.theme.color.lightBlue)};
  border: 1px solid #000000;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
