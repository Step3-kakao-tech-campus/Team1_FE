import CheckBox from 'components/@commons/CheckBox';
import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import React from 'react';
import styled from 'styled-components';

interface Props {
  formHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddinfoSection = ({ formHandler, toggleHandler }: Props): JSX.Element => {
  return (
    <FlexContainer $wFull $gap="30px">
      <Text>회원 가입을 위해 추가 정보를 입력해주세요</Text>
      <Input id="userName" onChange={formHandler} placeholder="이름" />

      <FlexContainer $direction="row" $justify="start" $padding="0 16px" $align="center">
        <CheckBox id="agreement" onChange={toggleHandler} type="checkbox" />
        <label htmlFor="agreement">
          <Text>약관동의</Text>
        </label>
      </FlexContainer>
    </FlexContainer>
  );
};

export default AddinfoSection;

const Input = styled.input`
  background: ${({ theme }) => theme.color.backgroundColor};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 10px 12px;
  border: 1px black;
`;
