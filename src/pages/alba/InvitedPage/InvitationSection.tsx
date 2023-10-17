import FlexContainer from 'components/@commons/FlexContainer';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import InvitationContent from './InvitationContent';
import SubmitButton from 'components/@commons/SubmitButton';
import useModal from 'hooks/useModal';
import { postGroupJoin } from 'apis/groupInvite';
import LoginOrSignup from 'components/@commons-feature/LoginOrSignup';
import useLogin from 'hooks/useLogin';

interface Props {
  invitationKey: string;
  afterJoinHandler: () => void;
}

const InvitationSection = ({ invitationKey, afterJoinHandler }: Props): JSX.Element => {
  const loginState = useLogin().getLoginState();

  const { modalOnHandler, modalOffHandler, ModalComponent } = useModal();

  // 초대 승인 클릭 시
  const acceptBtnHandler = (): void => {
    if (loginState.isLogin) {
      postGroupJoin({ invitationKey: invitationKey })
        .then((res) => {
          afterJoinHandler(); // 그룹 가입 완료 페이지로 이동
        })
        .catch((err) => {
          // 에러 처리
        });
    } else {
      modalOnHandler();
    }
  };

  return (
    <>
      <ModalComponent>
        <LoginOrSignup redirectPage={'/invited/' + invitationKey} />
        <button onClick={modalOffHandler}>닫기</button>
      </ModalComponent>

      <FlexContainer $wFull={true} $padding="80px" $gap="60px">
        <ErrorBoundary fallback={<p>유효하지 않은 초대입니다</p>}>
          <Suspense fallback={<div>초대장 로딩</div>}>
            <InvitationContent invitationKey={invitationKey} />
          </Suspense>

          <SubmitButton onClick={acceptBtnHandler}>승인하기</SubmitButton>
        </ErrorBoundary>
      </FlexContainer>
    </>
  );
};

export default InvitationSection;
