import { UserData } from 'apis/types';
import Loader from 'components/Suspenses/Loader';
import GetInviteKeyModal from 'components/modals/GetInviteKeyModal';
import useGetMyInfo, { UserType } from 'hooks/useGetMyInfo';
import useModal from 'hooks/useModal';
import useLogin from 'pages/auth/hooks/useLogin';
import { Suspense } from 'react';
import { loginDatahandlers } from 'utils/loginDatahandlers';
import FlexContainer from '../@commons/FlexContainer';
import Text from '../@commons/Text';
import { HorizontalLine, SidebarBackground, SidebarBox } from './styles';

const Sidebar = ({ closeHandler }: { closeHandler: () => void }): JSX.Element => {
  return (
    <SidebarBackground onClick={closeHandler}>
      <SidebarBox onClick={(e) => e.stopPropagation()}>
        <Suspense fallback={<Loader />}>
          <SideBarContent />
        </Suspense>
      </SidebarBox>
    </SidebarBackground>
  );
};

export default Sidebar;

const SideBarContent = () => {
  const isAdmin = loginDatahandlers.getLoginData().isAdmin;
  const { userName, userType, groupName, members } = useGetMyInfo();

  return (
    <FlexContainer $wFull $justify="start" $gap="32px" $wrap="wrap">
      <SideBarProfile userName={userName} isAdmin={isAdmin} userType={userType} groupName={groupName} />
      <SideBarButtons userType={userType} />
      {(userType === 'ALBA' || userType === 'ADMIN') && <SideBarMemberList memberList={members} />}
    </FlexContainer>
  );
};

const SideBarProfile = ({
  userName,
  isAdmin,
  groupName,
  userType,
}: {
  userName: string;
  isAdmin: boolean;
  userType: UserType;
  groupName: string | null;
}) => {
  return (
    <FlexContainer $gap="12px" $padding="0">
      <FlexContainer $direction="row" $justify="start" $align="center">
        <Text size="lg" weight="bold" margin="0">
          {userName}
        </Text>
        <Text margin="0">{isAdmin && 'Admin'}</Text>
      </FlexContainer>
      <FlexContainer $direction="row" $justify="start" $align="center">
        <Text margin="0 0 4px 0" size="sm">
          {userType === 'ALBA_NO_GROUP' || userType === 'ADMIN_NO_GROUP' ? '무소속' : groupName}
        </Text>
      </FlexContainer>

      <HorizontalLine />
    </FlexContainer>
  );
};

const SideBarButtons = ({ userType }: { userType: UserType }) => {
  const { logout } = useLogin('/');
  const { modalOnHandler } = useModal();
  return (
    <FlexContainer $align="flex-start" $gap="20px">
      {(userType === 'ADMIN' || userType === 'ADMIN_NO_MEMBER') && (
        <button onClick={() => modalOnHandler(<GetInviteKeyModal />)}>
          <Text>직원 초대하기</Text>
        </button>
      )}
      <button onClick={logout}>
        <Text>로그아웃</Text>
      </button>
    </FlexContainer>
  );
};

const SideBarMemberList = ({ memberList }: { memberList?: UserData[] }) => {
  return (
    <FlexContainer $wFull $align="flex-start" $gap="16px">
      <Text weight="bold" margin="0">
        우리 매장 직원 목록
      </Text>
      <HorizontalLine />

      <FlexContainer as="ol" $wFull $align="flex-start" $gap="16px">
        {memberList?.map((member: UserData) => (
          <li key={`${member.name}${member.userId}`}>
            <Text>{member.name}</Text>
          </li>
        ))}
      </FlexContainer>
    </FlexContainer>
  );
};
