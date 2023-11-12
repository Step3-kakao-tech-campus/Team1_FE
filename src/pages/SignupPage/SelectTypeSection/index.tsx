import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import React from 'react';
import styled from 'styled-components';

interface Props {
  selectOneHandler: (event: React.MouseEvent<HTMLElement>, value: boolean) => void;
  isAdmin: boolean | null;
}

const SelectTypeSection = ({ selectOneHandler, isAdmin }: Props): JSX.Element => {
  return (
    <FlexContainer $direction="row" $wFull={true} $padding="20px 0">
      <Button id="isAdmin" onClick={(e) => selectOneHandler(e, true)} $isSelected={isAdmin === true}>
        <Text size="lg" block>
          매니저로
        </Text>
        <Text size="lg" block>
          시작하기
        </Text>
      </Button>
      <Button id="isAdmin" onClick={(e) => selectOneHandler(e, false)} $isSelected={isAdmin === false}>
        <Text size="lg" block>
          알바생으로
        </Text>
        <Text size="lg" block>
          시작하기
        </Text>
      </Button>
    </FlexContainer>
  );
};

export default SelectTypeSection;

const Button = styled.button<{ color?: string; $isSelected: boolean }>`
  width: 100%;
  padding: 50px 10px;

  background: ${(props) => (props.$isSelected ? props.theme.color.yellow : props.theme.color.lightBlue)};
  border: 1px solid #000000;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
