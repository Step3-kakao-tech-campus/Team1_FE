import React from 'react';
import { RootState } from 'states/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useLogin from 'hooks/useLogin';
import useModal from 'hooks/useModal';
import { getGroupMemberList } from 'apis/manageGroup';
import { getInviteKey } from 'apis/groupInvite';
import GetInviteKey from 'components/admin-etc/GetInviteKey';

interface Props {}

const Sidebar = ({}: Props): JSX.Element => {
  const loginInfo = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();
  const { logout } = useLogin('/');
  const { isOn, modalOnHandler, modalOffHandler, ModalComponent } = useModal();
  // const inviteKey = getInviteKey();
  const inviteKey = {
    response: {
      invitationKey: 'abcde',
    },
  };

  // const memberList = getGroupMemberList();
  const memberList = {
    success: true,
    response: {
      groupName: '롯데월드 어드벤쳐 부산',
      members: [
        {
          memberId: 1,
          name: '라이언',
          isAdmin: true,
        },
        {
          memberId: 2,
          name: '어피치',
          isAdmin: false,
        },
      ],
    },
    error: null,
  };

  const handleCopyKeys = async (text: string) => {
    return await navigator.clipboard.writeText(text);
  };

  return (
    <>
      {/* 프로필 부분 */}
      <div>
        <div>
          <span className="mr-3 font-bold">
            {/* {loginInfo.userData.userName} */}
            {'라이언'}
          </span>
          <span>
            {/* {loginInfo.userData.isAdmin && 'Admin'} */}
            {'Admin'}
          </span>
        </div>

        <div>
          {/* {loginInfo.userData.groupName} */}
          {'롯데리아'}
        </div>
      </div>

      {/* 기능 버튼 부분 */}
      <div>
        <div onClick={() => navigate('/')}>사용 가이드</div>
        <div onClick={logout}>로그아웃</div>
        {!loginInfo?.userData?.isAdmin && <div onClick={modalOnHandler}>직원 초대하기</div>}
      </div>
      {/* 그룹원 조회 부분 */}
      <div>
        우리 매장 직원 목록
        <div>
          {memberList.response.members.map((member) => (
            <ol key={member.memberId}>{member.name}</ol>
          ))}
        </div>
      </div>
      {isOn && (
        <ModalComponent>
          <GetInviteKey modalOffHandler={modalOffHandler} />
        </ModalComponent>
      )}
    </>
  );
};

export default Sidebar;
