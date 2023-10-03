import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from 'components/@commons/PageContainer';
import JoinDone from 'components/alba-invited/JoinDone';
import InvitationTemplate from 'components/alba-invited/InvitationTemplate';

interface Component {}

const InvitedPage = ({}: Component): JSX.Element => {
  const param = useParams()?.invitationKey;
  const invitationKey: string = !!param ? param : '';

  const [isDone, setisDone] = useState(false);

  return (
    <PageContainer withoutHeader withoutBottonBar>
      {isDone ? (
        <JoinDone />
      ) : (
        <InvitationTemplate invitationKey={invitationKey} afterJoinHandler={() => setisDone((prev) => true)} />
      )}
    </PageContainer>
  );
};

export default InvitedPage;
