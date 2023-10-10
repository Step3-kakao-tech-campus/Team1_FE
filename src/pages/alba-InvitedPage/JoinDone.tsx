import { convertPath } from 'apis/convertURI';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const JoinDone = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <FlexContainer $wFull $padding="60px" $align="center">
      <span className="text-center text-xl font-bold">그룹 가입을 축하합니다</span>
      <div className="w-full h-[500px] bg-black"> 임시 기능 소개 화면 </div>

      <SubmitButton onClick={() => navigate(convertPath('/'))}>메인 페이지로 이동하기</SubmitButton>
    </FlexContainer>
  );
};

export default JoinDone;
