import FlexContainer from 'components/@commons/FlexContainer';
import React from 'react';
import styled from 'styled-components';

interface Props {
  selectOneHandler: any;
  userInfo: any;
}

const SelectType = ({ selectOneHandler, userInfo }: Props): JSX.Element => {
  return (
    <FlexContainer $direction="row" $wFull={true} $padding="0 40px">
      <Button id="isAdmin" onClick={(e) => selectOneHandler(e, true)} $isSelected={userInfo.isAdmin === true}>
        매니저로 <br /> 시작하기
      </Button>
      <Button id="isAdmin" onClick={(e) => selectOneHandler(e, false)} $isSelected={userInfo.isAdmin === false}>
        알바생으로 <br /> 시작하기
      </Button>
    </FlexContainer>
  );
};

export default SelectType;

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
