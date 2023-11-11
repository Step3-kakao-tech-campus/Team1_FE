import CheckBox from 'components/@commons/CheckBox';
import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import { UserNameInput } from 'pages/SignupPage/styles';
import React from 'react';

interface Props {
  formHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isNameError: boolean;
}

const AddinfoSection = ({ formHandler, toggleHandler, isNameError }: Props): JSX.Element => {
  return (
    <FlexContainer $wFull $gap="8px">
      <UserNameInput id="userName" onChange={formHandler} placeholder="이름" />
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
