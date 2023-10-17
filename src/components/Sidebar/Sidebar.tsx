import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from 'hooks/useLogin';
import useModal from 'hooks/useModal';
import { getGroupMemberList } from 'apis/manageGroup';
import GetInviteKey from 'components/GetInviteKey';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import Text from '../@commons/Text';
import { convertPath } from 'apis/convertURI';
import FlexContainer from '../@commons/FlexContainer';

const Sidebar = (): JSX.Element => {
  /* ----------------------- ! 수정 중 입니다 ! ------------------------ */

  // 이 부분을 변경된 API 구조에 맞게 바꿔주세요.
  const { data: memberList } = useQuery(['members'], getGroupMemberList);

  // 로그인 상태를 가져오는 방법도 변경되었습니다.
  const loginInfo = { userData: { userName: 'aa', isAdmin: true, groupName: 'aa' } };

  const navigate = useNavigate();
  const { logout } = useLogin('/');
  const { modalOnHandler, modalOffHandler, ModalComponent } = useModal();

  // 가독성을 위해 컴포넌트를 2단위 정도로 분리해주세요
  return (
    <>
      {/* 프로필 부분 */}
      <FlexContainer $wFull $gap="0" $direction="column">
        <FlexContainer $direction="row" $justify="start" $align="center">
          <Text size="lg" weight="bold" margin="0">
            {loginInfo.userData.userName}
          </Text>
          <Text margin="0">{loginInfo.userData.isAdmin && 'Admin'}</Text>
        </FlexContainer>
        <FlexContainer $direction="row" $justify="start" $align="center">
          <Text margin="0">{loginInfo.userData.groupName}</Text>
        </FlexContainer>
        <HorizontalLine />

        <FlexContainer $wFull $align="flex-start" $gap="0.5rem">
          <FlexContainer onClick={() => navigate(convertPath('/'))}>
            <Text>사용 가이드</Text>
          </FlexContainer>
          <FlexContainer onClick={logout}>
            <Text>로그아웃</Text>
          </FlexContainer>
          {loginInfo.userData.isAdmin && (
            <FlexContainer onClick={modalOnHandler}>
              <Text>직원 초대하기</Text>
            </FlexContainer>
          )}
        </FlexContainer>
      </FlexContainer>

      {/* 그룹원 조회 부분 */}
      <FlexContainer $wFull $align="flex-start" $gap="0">
        <Text weight="bold" margin="0">
          우리 매장 직원 목록
        </Text>
        <HorizontalLine />

        <FlexContainer $wFull $align="flex-start" $gap="0.5rem">
          {memberList?.data.members.map((member: { memberId: number; name: string; isAdmin: boolean }) => (
            <ol key={member.memberId}>
              <Text>
                {member.name}
                {member.isAdmin && ' (Admin)'}
              </Text>
            </ol>
          ))}
        </FlexContainer>
      </FlexContainer>

      <ModalComponent>
        <GetInviteKey modalOffHandler={modalOffHandler} />
      </ModalComponent>
    </>
  );
};

export default Sidebar;

const HorizontalLine = styled.div`
  border-top: 0.05rem solid;
  border-color: gray;
  width: 100%;
  height: 0.5rem;
  margin: 0.5rem 0;
`;
