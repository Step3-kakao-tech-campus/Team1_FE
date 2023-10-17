import React from 'react';
import { RootState } from 'states/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useLogin from 'hooks/useLogin';
import useModal from 'hooks/useModal';
import { getGroupMemberList } from 'apis/manageGroup';
import GetInviteKey from 'components/admin-etc/GetInviteKey';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import Text from '../Text';
import { convertPath } from 'apis/convertURI';
import FlexContainer from '../FlexContainer';

const Sidebar = (): JSX.Element => {
  const loginInfo = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();
  const { logout } = useLogin('/');
  const { modalOnHandler, modalOffHandler, ModalComponent } = useModal();

  const { data: memberList } = useQuery(['members'], getGroupMemberList);

  return (
    <>
      {/* 프로필 부분 */}
      <FlexContainer $gap="0" $margin="0 0 1rem 0" $direction="column">
        <FlexContainer $align="center" $direction="row" $justify="left">
          <Text size="lg" weight="bold">
            {loginInfo.userData.userName}
          </Text>
          <Text>{loginInfo.userData.isAdmin && 'Admin'}</Text>
        </FlexContainer>
        <FlexContainer>
          <Text>{loginInfo.userData.groupName}</Text>
        </FlexContainer>
      </FlexContainer>
      <HorizontalLine />

      {/* 기능 버튼 부분 */}
      <FlexContainer $margin="1.5rem 0 2rem 0" $direction="column" $gap="0.5rem">
        <FlexContainer $margin="0 0 0.1rem 0">
          <div onClick={() => navigate(convertPath('/'))}>
            <Text size="lg">사용 가이드</Text>
          </div>
        </FlexContainer>
        <FlexContainer $margin="0 0 0.1rem 0">
          <div onClick={logout}>
            <Text size="lg">로그아웃</Text>
          </div>
        </FlexContainer>
        {loginInfo.userData.isAdmin && (
          <FlexContainer $margin="0 0 0.1rem 0">
            <div onClick={modalOnHandler}>
              <Text size="lg">직원 초대하기</Text>
            </div>
          </FlexContainer>
        )}
      </FlexContainer>

      {/* 그룹원 조회 부분 */}
      <FlexContainer $margin="0 0 0.5rem 0">
        <Text weight="bold">우리 매장 직원 목록</Text>
      </FlexContainer>
      <HorizontalLine />
      <Text>
        {memberList?.data.members.map((member: { memberId: number; name: string; isAdmin: boolean }) => (
          <ol key={member.memberId}>
            <FlexContainer $margin="0 0 0.5rem 1rem">
              <Text size="lg">
                {member.name}
                {member.isAdmin && ' (Admin)'}
              </Text>
            </FlexContainer>
          </ol>
        ))}
      </Text>

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
`;
