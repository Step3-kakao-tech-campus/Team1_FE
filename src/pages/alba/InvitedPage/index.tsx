import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from 'components/@commons/PageContainer';
import JoinDone from 'pages/alba/InvitedPage/JoinDone';
import FlexContainer from 'components/@commons/FlexContainer';
import InvitationSkeleton from 'components/Suspenses/PageSkeletons/InvitationSkeleton';
import InvitationContent from './InvitationContent';
import SubmitButton from 'components/@commons/SubmitButton';
import LoginSignup from 'components/modals/LoginSignup';
import useInvitation from 'hooks/alba/invitation/useInvitation';

const InvitedPage = (): JSX.Element => {
  const invitationKey: string = useParams()?.invitationKey || '';
  const donePage = <JoinDone />;
  const loginModal = <LoginSignup invitationKey={invitationKey} />;
  const { acceptBtnHandler } = useInvitation(invitationKey, donePage, loginModal);

  return (
    <PageContainer withoutHeader withoutBottonBar>
      <FlexContainer $wFull $padding="60px" $gap="36px">
        <Suspense fallback={<InvitationSkeleton />}>
          <InvitationContent invitationKey={invitationKey} />
          <SubmitButton onClick={acceptBtnHandler}>승인하기</SubmitButton>
        </Suspense>
      </FlexContainer>
    </PageContainer>
  );
};

export default InvitedPage;
