import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from 'apis/userInfo';
import PageContainer from 'components/@commons/PageContainer';

const AlbaMainPage = (): JSX.Element => {
  const { data: membersData } = useQuery(['getMyInfo'], getMyInfo, { suspense: true });
  const hasGroup = membersData?.data.groupName !== null;

  return (
    <PageContainer withoutBottonBar={!hasGroup}>
      {!hasGroup && <div>그룹 없음</div>}
      {hasGroup && <div>알바스케줄페이지</div>}
    </PageContainer>
  );
};

export default AlbaMainPage;
