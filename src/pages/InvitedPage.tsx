import React, { Suspense, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'states/store';
import { getGroupInvitation, postGroupJoin } from 'apis/groupInvite';
import { useQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import LoginOrSignup from 'components/organisms/LoginOrSignup';
import { convertPath } from 'apis/convertURI';

interface Component {}

const InvitedPage = ({}: Component): JSX.Element => {
  const param = useParams()?.invitationKey;
  const invitationKey: string = !!param ? param : '';

  const loginState = useSelector((state: RootState) => state.login);
  const [isModal, setIsModal] = useState(false);
  const [isDone, setisDone] = useState(false);

  // 초대 승인 클릭 시
  const AcceptBtnHandler = (): void => {
    switch (loginState.islogin) {
      case false: // 비로그인 상태일 때
        setIsModal((prev) => true); // 로그인/회원가입 모달
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
    <div>
      {isModal && <LoginOrSignup redirectPage={'/invited/' + invitationKey} />}
      <ErrorBoundary fallback={<p>유효하지 않은 초대입니다</p>}>
        <Suspense fallback={<div>초대장 로딩</div>}>
          <Invitation invitationKey={invitationKey} />
        </Suspense>
        <button onClick={AcceptBtnHandler}>승인하기</button>
      </ErrorBoundary>
    </div>
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
  return <p>{obj?.data.groupName} 에 초대되었습니다</p>;
};

const InvitationDone = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div>
      <p>가입을 축하합니다</p>
      <button onClick={() => navigate(convertPath('/'))}>이동하기</button>
    </div>
  );
};
