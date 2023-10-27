import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from 'components/@commons/PageContainer';
import JoinDone from 'pages/alba/InvitedPage/JoinDone';
import InvitationSection from 'pages/alba/InvitedPage/InvitationSection';

const InvitedPage = (): JSX.Element => {
  // 로그인상태인 유저가 이미 그룹에 소속된 경우 : 리다이렉트 "/" 또는 에러페이지

  const param = useParams()?.invitationKey;
  const invitationKey: string = param || '';

  const [isDone, setisDone] = useState(false);

  return (
    <PageContainer withoutHeader withoutBottonBar>
      {isDone ? (
        <JoinDone />
      ) : (
        <InvitationSection invitationKey={invitationKey} afterJoinHandler={() => setisDone(true)} />
      )}
    </PageContainer>
  );
};

export default InvitedPage;
