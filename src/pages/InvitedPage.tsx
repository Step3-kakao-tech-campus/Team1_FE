import React, { Suspense, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'states/store';
import { getGroupInvitation, postGroupJoin } from 'apis/groupInvite';
import { useQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import LoginOrSignup from 'components/molecules/LoginOrSignup';
import { convertPath } from 'apis/convertURI';
import useModal from 'hooks/useModal';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import PageContainer from 'components/@commons/PageContainer';

interface Component {}

const InvitedPage = ({}: Component): JSX.Element => {
  const param = useParams()?.invitationKey;
  const invitationKey: string = !!param ? param : '';

  const loginState = useSelector((state: RootState) => state.login);
  const [isDone, setisDone] = useState(false);

  const { modalOnHandler, modalOffHandler, ModalComponent } = useModal();

  // 초대 승인 클릭 시
  const AcceptBtnHandler = (): void => {
    switch (loginState.islogin) {
      case false: // 비로그인 상태일 때
        modalOnHandler(); // 로그인/회원가입 모달
        break;

      case true: // 로그인 상태일 때
        postGroupJoin(invitationKey)
          .then((res) => {
            setisDone((prev) => true); // 그룹 가입 완료 페이지로 이동
          })
          .catch((err) => {
            console.log(err);
          });
        break;
    }
  };

  return isDone ? (
    <InvitationDone />
  ) : (
    <PageContainer>
      <ModalComponent>
        <LoginOrSignup redirectPage={'/invited/' + invitationKey} />
        <button onClick={modalOffHandler}>닫기</button>
      </ModalComponent>

      <FlexContainer $wFull={true} $padding="80px" $gap="60px">
        <ErrorBoundary fallback={<p>유효하지 않은 초대입니다</p>}>
          <Suspense fallback={<div>초대장 로딩</div>}>
            <Invitation invitationKey={invitationKey} />
          </Suspense>
          <SubmitButton onClick={AcceptBtnHandler}>승인하기</SubmitButton>
        </ErrorBoundary>
      </FlexContainer>
    </PageContainer>
  );
};

export default InvitedPage;

interface Props {
  invitationKey: string;
}

const Invitation = ({ invitationKey }: Props): JSX.Element => {
  // 초대링크 페이지 접속 시
  const { data: obj } = useQuery(
    ['invitation', invitationKey],
    () => {
      return getGroupInvitation(invitationKey);
    },
    {
      suspense: true,
    },
  );
  return (
    <FlexContainer>
      <FlexContainer $align="center" $padding="20px">
        <div className="w-20 h-20 rounded-full bg-blue-600">임시 프로필</div>
      </FlexContainer>
      <FlexContainer>
        <span className="text-center font-bold text-3xl">{obj?.data.groupName}</span>
      </FlexContainer>
      <FlexContainer $wFull={true}>
        <span className="text-center">그룹에 초대되었습니다.</span>
      </FlexContainer>
    </FlexContainer>
  );
};

const InvitationDone = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <FlexContainer $wFull $padding="60px" $align="center">
        <span className="text-center text-xl font-bold">가입을 축하합니다</span>
        <div className="w-full h-[500px] bg-black"> 임시 기능 소개 화면 </div>

        <SubmitButton onClick={() => navigate(convertPath('/'))}>메인 페이지로 이동하기</SubmitButton>
      </FlexContainer>
    </PageContainer>
  );
};
