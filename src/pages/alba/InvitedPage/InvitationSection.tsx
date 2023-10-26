import FlexContainer from 'components/@commons/FlexContainer';
import React, { Suspense } from 'react';
import InvitationContent from './InvitationContent';
import SubmitButton from 'components/@commons/SubmitButton';
import useModal from 'hooks/useModal';
import { postGroupJoin } from 'apis/alba/joinGroup';
import LoginOrSignup from 'components/LoginSignUpButton/LoginOrSignup';
import useErrorHandler from 'error/useErrorHandler';
import InvitationSkeleton from 'components/Suspenses/PageSkeletons/InvitationSkeleton';
import { getLoginData } from 'utils/loginDatahandlers';

interface Props {
  invitationKey: string;
  afterJoinHandler: () => void;
}

const InvitationSection = ({ invitationKey, afterJoinHandler }: Props): JSX.Element => {
  const loginState = getLoginData();
  const { modalOnHandler, modalOffHandler } = useModal();
  const { apiErrorHandler } = useErrorHandler();

  // 초대 승인 클릭 시
  const acceptBtnHandler = (): void => {
    if (loginState.isLogin) {
      postGroupJoin({ invitationKey: invitationKey })
        .then((res) => {
          afterJoinHandler(); // 그룹 가입 완료 페이지로 이동
        })
        .catch((error) => {
          apiErrorHandler(error);
        });
    } else {
      modalOnHandler(
        <>
          <LoginOrSignup redirectPage={'/invited/' + invitationKey} />
          <button onClick={modalOffHandler}>닫기</button>
        </>,
      );
    }
  };

  return (
    <>
      <FlexContainer $wFull $padding="60px" $gap="36px">
        <Suspense fallback={<InvitationSkeleton />}>
          <InvitationContent invitationKey={invitationKey} />
          <SubmitButton onClick={acceptBtnHandler}>승인하기</SubmitButton>
        </Suspense>
      </FlexContainer>
    </>
  );
};

export default InvitationSection;
