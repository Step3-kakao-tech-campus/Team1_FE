import React from 'react';
import { RootState } from 'states/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useLogin from 'hooks/useLogin';
import useModal from 'hooks/useModal';
import { getGroupMemberList } from 'apis/manageGroup';
import GetInviteKey from 'components/admin-etc/GetInviteKey';
import styled from 'styled-components';

interface Props {}

const Sidebar = ({}: Props): JSX.Element => {
  const loginInfo = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();
  const { logout } = useLogin('/');
  const { isOn, modalOnHandler, modalOffHandler, ModalComponent } = useModal();

  const memberList = getGroupMemberList();

  return (
    <>
      {/* 프로필 부분 */}
      <div>
        <Profile>
          <FontStyle bold="bold">{loginInfo.userData.userName}</FontStyle>
          <FontStyle>{loginInfo.userData.isAdmin && 'Admin'}</FontStyle>
        </Profile>
        <FontStyle size="0.75rem">{loginInfo.userData.groupName}</FontStyle>
      </div>
      <HorizontalLine />

      {/* 기능 버튼 부분 */}
      <Features>
        <Feature>
          <div onClick={() => navigate('/')}>사용 가이드</div>
        </Feature>
        <Feature>
          <div onClick={logout}>로그아웃</div>
        </Feature>
        {!loginInfo?.userData?.isAdmin && (
          <Feature>
            <div onClick={modalOnHandler}>직원 초대하기</div>
          </Feature>
        )}
      </Features>

      {/* 그룹원 조회 부분 */}
      <FontStyle size="0.75rem" bold="bold">
        우리 매장 직원 목록
      </FontStyle>
      <HorizontalLine />
      <FontStyle>
        {memberList.response.members.map((member) => (
          <ol key={member.memberId}>
            <Tap>
              {member.name}
              {member.isAdmin && ' (Admin)'}
            </Tap>
          </ol>
        ))}
      </FontStyle>
      {isOn && (
        <ModalComponent>
          <GetInviteKey modalOffHandler={modalOffHandler} />
        </ModalComponent>
      )}
    </>
  );
};

export default Sidebar;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Features = styled.div`
  margin-bottom: 1rem;
`;

const Feature = styled.div`
  margin-block: 0.5rem;
`;

const Tap = styled.div`
  margin-left: 1rem;
`;

const FontStyle = styled.div<{ size?: string; bold?: string }>`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
`;

const HorizontalLine = styled.div`
  border-top: 0.05rem solid;
  border-color: gray;
  width: 100%;
  height: 0.5rem;
  /* margin-bottom: 0.5rem; */
  margin-top: 0.5rem;
`;
