import React, { Suspense, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'states/store';
import { getGroupInvitation, postGroupJoin } from 'apis/groupInvite';
import { useQuery } from '@tanstack/react-query';

interface Component {}

const InvitedPage = ({}: Component): JSX.Element => {
  const param = useParams()?.invitationKey;
  const invitationKey: string = !!param ? param : '';
  const navigate = useNavigate();

  // 초대링크 페이지 접속 시
  const { data } = useQuery([invitationKey], getGroupInvitation, {
    suspense: true,
    onError: () => {
      // 유효하지 않은 초대 : 에러 페이지로 강제 이동
    },
  });

  const loginState = useSelector((state: RootState) => state.login);
  const [isModal, setIsModal] = useState(false);

  // 초대 승인 클릭 시
  const AcceptBtnHandler = (): void => {
    if (!loginState.islogin) {
      setIsModal((prev) => true); // 로그인/회원가입 모달
      // 로컬에 초대키 킵하기
      // 카카오 redirect uri 고민해보기
      // login/kakao 페이지를 팝업처리?
      return;
    }

    postGroupJoin(invitationKey)
      .then((res) => {
        // 그룹 가입 완료 페이지로 이동
      })
      .catch(() => {
        // 승인 오류
      });

    return;
  };

  return (
    <div>
      {isModal && <div>로그인 모달</div>}
      <Suspense fallback={<div>로딩</div>}>{data?.data.groupName}</Suspense>
      <button onClick={AcceptBtnHandler}>승인하기</button>
    </div>
  );
};

export default InvitedPage;
