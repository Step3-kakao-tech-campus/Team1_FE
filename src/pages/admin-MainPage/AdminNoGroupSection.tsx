import { convertPath } from 'apis/convertURI';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNoGroupSection = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <FlexContainer $wFull>
      <Text>그룹을 생성하세요</Text>
      <SubmitButton onClick={() => navigate(convertPath('/addGroup'))}>그룹 생성하기</SubmitButton>
    </FlexContainer>
  );
};

export default AdminNoGroupSection;
