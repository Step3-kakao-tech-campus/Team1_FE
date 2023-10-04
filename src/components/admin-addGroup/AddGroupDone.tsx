import { convertPath } from 'apis/convertURI';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddGroupDone = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <FlexContainer $wFull={true} $align="stretch" $gap="60px" $padding="24px">
      <FlexContainer>
        <span className="text-center text-2xl font-bold">그룹 생성에 성공했습니다</span>
        <span className="text-center text-xl">이제 근무일정을 관리하세요</span>
      </FlexContainer>

      <SubmitButton onClick={() => navigate(convertPath('/'))}>메인으로 이동</SubmitButton>
    </FlexContainer>
  );
};

export default AddGroupDone;
