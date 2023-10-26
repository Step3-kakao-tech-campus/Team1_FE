import CheckBox from 'components/@commons/CheckBox';
import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import React from 'react';
import styled from 'styled-components';

interface Props {
  formHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isNameError: boolean;
}

const AddinfoSection = ({ formHandler, toggleHandler, isNameError }: Props): JSX.Element => {
  return (
    <FlexContainer $gap="8px">
      <Input id="userName" onChange={formHandler} placeholder="이름" />
      {isNameError && <Text margin="0 0 0 auto">이름을 올바르게 입력해주세요</Text>}
      <FlexContainer $direction="row" $justify="start" $padding="16px" $align="center">
        <CheckBox id="agreement" onChange={toggleHandler} type="checkbox" />
        <label htmlFor="agreement">
          <Text>약관동의 (필수)</Text>
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
  border: 1px solid;
`;
