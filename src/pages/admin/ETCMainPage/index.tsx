import { convertPath } from 'apis/convertURI';
import FlexContainer from 'components/@commons/FlexContainer';
import GrayBox from 'components/@commons/GrayBox';
import PageContainer from 'components/@commons/PageContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import GetInviteKeyModal from 'components/modals/GetInviteKeyModal';
import useModal from 'hooks/useModal';
import React from 'react';
import { Link } from 'react-router-dom';

export const AdminNoGroupPage = (): JSX.Element => {
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

            <Link to={convertPath('/addGroup')}>
              <SubmitButton>그룹 생성하기</SubmitButton>
            </Link>
          </FlexContainer>
        </GrayBox>
      </FlexContainer>
    </PageContainer>
  );
};

export const AdminNoMemberPage = (): JSX.Element => {
  const { modalOnHandler } = useModal();
  return (
    <>
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
              <SubmitButton onClick={() => modalOnHandler(<GetInviteKeyModal />)}>초대링크 발급받기</SubmitButton>
            </FlexContainer>
          </GrayBox>
        </FlexContainer>
      </PageContainer>
    </>
  );
};
