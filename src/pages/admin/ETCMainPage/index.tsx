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
        <GrayBox>
          <FlexContainer $wFull $gap="48px">
            <FlexContainer $gap="10px">
              <Text size="80px" weight="bold" color="red">
                !
              </Text>
              <Text size="xl">그룹이 없습니다</Text>
            </FlexContainer>
            <SubmitButton onClick={() => navigate(convertPath('/addGroup'))}>그룹 생성하기</SubmitButton>
          </FlexContainer>{' '}
        </GrayBox>
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
        <FlexContainer $wFull>
          <GrayBox>
            <FlexContainer $wFull $gap="48px">
              <FlexContainer $gap="10px">
                <Text size="80px" weight="bold" color="red">
                  !
                </Text>
                <Text size="xl">그룹에 직원이 없습니다</Text>
              </FlexContainer>
              <SubmitButton onClick={modalOnHandler}>초대링크 발급받기</SubmitButton>
            </FlexContainer>
          </GrayBox>
        </FlexContainer>
      </PageContainer>
    </>
  );
};
