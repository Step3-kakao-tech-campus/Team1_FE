import { convertPath } from 'apis/convertURI';
import FlexContainer from 'components/@commons/FlexContainer';
import GrayBox from 'components/@commons/GrayBox';
import PageContainer from 'components/@commons/PageContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import GetInviteKey from 'components/GetInviteKey';
import useModal from 'hooks/useModal';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminNoGroupPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <PageContainer withoutBottonBar>
      <FlexContainer $wFull>
        <Text>그룹을 생성하세요</Text>
        <SubmitButton onClick={() => navigate(convertPath('/addGroup'))}>그룹 생성하기</SubmitButton>
      </FlexContainer>
    </PageContainer>
  );
};

export const AdminNoMemberPage = (): JSX.Element => {
  const { modalOnHandler, modalOffHandler, ModalComponent } = useModal();
  return (
    <>
      <ModalComponent>
        <GetInviteKey modalOffHandler={modalOffHandler} />
      </ModalComponent>
      <PageContainer withoutBottonBar>
        <Text>그룹에 직원이 없습니다</Text>
        <SubmitButton onClick={modalOnHandler}>초대링크 발급받기</SubmitButton>
      </PageContainer>
    </>
  );
};
