import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from 'apis/userInfo';
import SchedulePage from 'pages/SchedulePage';
import PageContainer from 'components/@commons/PageContainer';
import GrayBox from 'components/@commons/GrayBox';
import { UserData } from 'apis/types';

const AlbaMainIndex = (): JSX.Element => {
  const { data: membersData } = useQuery(['getMyInfo'], getMyInfo, { suspense: true });
  const hasGroup = membersData?.data.groupName !== null;

  return (
    <>
      {!hasGroup && (
        <PageContainer withoutBottonBar>
          <GrayBox>매니저에게 초대링크를 요청하세요</GrayBox>
        </PageContainer>
      )}
      {hasGroup && <SchedulePage members={membersData?.data.members as UserData[]} />}
    </>
  );
};

export default AlbaMainIndex;
