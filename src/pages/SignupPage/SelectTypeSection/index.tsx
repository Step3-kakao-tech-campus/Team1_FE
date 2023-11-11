import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import { UserTypeButton } from 'pages/SignupPage/styles';
import React from 'react';

interface Props {
  selectOneHandler: (event: React.MouseEvent<HTMLElement>, value: boolean) => void;
  isAdmin: boolean | null;
}

const SelectTypeSection = ({ selectOneHandler, isAdmin }: Props): JSX.Element => {
  return (
    <FlexContainer $direction="row" $wFull={true} $padding="20px 0">
      <UserTypeButton id="isAdmin" onClick={(e) => selectOneHandler(e, true)} $isSelected={isAdmin === true}>
        <Text size="lg" block>
          매니저로
        </Text>
        <Text size="lg" block>
          시작하기
        </Text>
      </UserTypeButton>
      <UserTypeButton id="isAdmin" onClick={(e) => selectOneHandler(e, false)} $isSelected={isAdmin === false}>
        <Text size="lg" block>
          알바생으로
        </Text>
        <Text size="lg" block>
          시작하기
        </Text>
      </UserTypeButton>
    </FlexContainer>
  );
};

export default SelectTypeSection;
