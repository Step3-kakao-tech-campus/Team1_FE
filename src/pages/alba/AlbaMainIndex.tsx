import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from 'apis/userInfo';
import SchedulePage from 'pages/SchedulePage';
import PageContainer from 'components/@commons/PageContainer';
import GrayBox from 'components/@commons/GrayBox';
import { UserData } from 'apis/types';
import Text from 'components/@commons/Text';
import FlexContainer from 'components/@commons/FlexContainer';

const AlbaMainIndex = (): JSX.Element => {
  const { data: membersData } = useQuery(['getMyInfo'], getMyInfo, { suspense: true });
  const hasGroup = membersData?.data.groupName !== null;

  return (
    <>
      {!hasGroup && <AlbaNoGroupPage />}
      {hasGroup && <SchedulePage members={membersData?.data.members as UserData[]} />}
    </>
  );
};

export default AlbaMainIndex;

export const AlbaNoGroupPage = (): JSX.Element => {
  return (
    <PageContainer withoutBottonBar>
      <GrayBox>
        <FlexContainer $wFull $gap="48px">
          <FlexContainer $gap="20px" $padding="0 0 20px 0">
            <Text size="80px" weight="bold" color="red">
              !
            </Text>
            <Text size="xxl">아직 가입한 그룹이 없습니다</Text>
            <Text>매니저에게 초대링크를 요청하세요</Text>
          </FlexContainer>
        </FlexContainer>
      </GrayBox>
    </PageContainer>
  );
};
