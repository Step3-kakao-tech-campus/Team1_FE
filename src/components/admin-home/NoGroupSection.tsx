import { convertPath } from 'apis/convertURI';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoGroupSection = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <FlexContainer $wFull $align="center">
      <span>그룹을 생성하세요</span>
      <SubmitButton onClick={() => navigate(convertPath('/addGroup'))}>그룹 생성하기</SubmitButton>
    </FlexContainer>
  );
};

export default NoGroupSection;
