import React, { Suspense } from 'react';
import useLogin from 'hooks/auth/useLogin';
import useModal from 'hooks/useModal';
import GetInviteKeyModal from 'components/modals/GetInviteKeyModal';
import { HorizontalLine, SidebarBackground, SidebarBox } from './styles';
import Text from '../@commons/Text';
import FlexContainer from '../@commons/FlexContainer';
import { UserData } from 'apis/types';
import { getLoginData } from 'utils/loginDatahandlers';
import Loader from 'components/Suspenses/Loader';
import useGetMyInfo from 'hooks/useGetMyInfo';

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
  const isAdmin = getLoginData().isAdmin;
  const { userName, userType, groupName, members } = useGetMyInfo();

  return (
    <FlexContainer $wFull $justify="start" $gap="32px" $wrap="wrap">
      <SideBarProfile userName={userName} isAdmin={isAdmin} userType={userType} groupName={groupName} />
      <SideBarButtons isAdmin={isAdmin} />
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
  userType: string;
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
          {userType === 'ALBA' || userType === 'ADMIN' ? groupName : '무소속'}
        </Text>
      </FlexContainer>

      <HorizontalLine />
    </FlexContainer>
  );
};

const SideBarButtons = ({ isAdmin }: { isAdmin: boolean }) => {
  const { logout } = useLogin('/');
  const { modalOnHandler } = useModal();
  return (
    <FlexContainer $align="flex-start" $gap="20px">
      {isAdmin && (
        <FlexContainer onClick={() => modalOnHandler(<GetInviteKeyModal />)}>
          <Text>직원 초대하기</Text>
        </FlexContainer>
      )}
      <FlexContainer onClick={logout}>
        <Text>로그아웃</Text>
      </FlexContainer>
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

      <FlexContainer $wFull $align="flex-start" $gap="16px">
        {memberList?.map((member: UserData) => (
          <ol key={`${member.name}${member.userId}`}>
            <Text>{member.name}</Text>
          </ol>
        ))}
      </FlexContainer>
    </FlexContainer>
  );
};
