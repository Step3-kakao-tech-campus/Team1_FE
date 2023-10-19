import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MemberData, getMyInfo } from 'apis/userInfo';
import SchedulePage from 'pages/SchedulePage';

const AlbaMainIndex = (): JSX.Element => {
  const { data: membersData } = useQuery(['getMyInfo'], getMyInfo, { suspense: true });
  const hasGroup = membersData?.data.groupName !== null;

  return (
    <>
      {!hasGroup && <div>매니저에게 초대링크를 받으세요</div>}
      {hasGroup && <SchedulePage members={membersData?.data.members as MemberData[]} />}
    </>
  );
};

export default AlbaMainIndex;
