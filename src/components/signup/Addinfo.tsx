import FlexContainer from 'components/@commons/FlexContainer';
import React from 'react';
import styled from 'styled-components';

interface Props {
  formHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  signupBtnHandler: () => void;
  userInfo: any;
}

const Addinfo = ({ formHandler, toggleHandler }: Props): JSX.Element => {
  return (
    <FlexContainer $wFull>
      <span className="text-center">회원 가입을 위해 추가 정보를 입력해주세요</span>
      <Input id="userName" onChange={formHandler} placeholder="이름" />

      <FlexContainer $direction="row" $justify="start" $padding="0 16px">
        <input id="agreement" onChange={toggleHandler} type="checkbox" />
        <label htmlFor="agreement">약관동의</label>
      </FlexContainer>
    </FlexContainer>
  );
};

export default Addinfo;

const Input = styled.input`
  background: ${({ theme }) => theme.color.backgroundColor};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 10px 12px;
  border: 1px black;
`;
