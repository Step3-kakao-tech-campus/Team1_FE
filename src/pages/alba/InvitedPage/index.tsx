import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import InvitationSkeleton from 'components/Suspenses/PageSkeletons/InvitationSkeleton';
import LoginSignupModal from 'components/modals/LoginSignupModal';
import JoinDone from 'pages/alba/InvitedPage/JoinDone';
import useInvitation from 'pages/alba/InvitedPage/hooks/useInvitation';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import InvitationContent from './InvitationContent';

const InvitedPage = (): JSX.Element => {
  const invitationKey: string = useParams()?.invitationKey || '';
  const donePage = <JoinDone />;
  const loginModal = <LoginSignupModal invitationKey={invitationKey} />;
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
