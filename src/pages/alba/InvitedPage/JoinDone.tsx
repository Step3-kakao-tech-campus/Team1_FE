import { convertPath } from 'apis/convertURI';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import usePopUpPage from 'hooks/usePopUpPage';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const JoinDone = (): JSX.Element => {
  const navigate = useNavigate();
  const { popUpOffHandler } = usePopUpPage();
  const btnOnClick = () => {
    popUpOffHandler();
    navigate(convertPath('/'));
  };
  return (
    <FlexContainer $wFull $hFull $padding="60px" $gap="80px">
      <FlexContainer>
        <Text size="xxl" weight="semiBold">
          그룹 가입에 성공했어요
        </Text>
        <Text> 이제 근무 일정을 신청하세요</Text>
      </FlexContainer>

      <SubmitButton onClick={btnOnClick}>메인 페이지로 이동하기</SubmitButton>
    </FlexContainer>
  );
};

export default JoinDone;
