import React, { Suspense } from 'react';
import useLogin from 'hooks/useLogin';
import useModal from 'hooks/useModal';
import GetInviteKey from 'components/modals/GetInviteKey';
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
        <FlexContainer $wFull $height="100vw" $justify="start" $gap="32px">
          <Suspense fallback={<Loader />}>
            <SideBarContent />
          </Suspense>
        </FlexContainer>
      </SidebarBox>
    </SidebarBackground>
  );
};

export default Sidebar;

const SideBarContent = () => {
  const isAdmin = getLoginData().isAdmin;
  const { userName, groupName, members } = useGetMyInfo();

  return (
    <>
      <SideBarProfile userName={userName} isAdmin={isAdmin} groupName={groupName} />
      <SideBarButtons isAdmin={isAdmin} />
      <SideBarMemberList memberList={members} />
    </>
  );
};

const SideBarProfile = ({
  userName,
  isAdmin,
  groupName,
}: {
  userName?: string;
  isAdmin: boolean;
  groupName?: string;
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
          {groupName}
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
        <FlexContainer onClick={() => modalOnHandler(<GetInviteKey />)}>
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
          <ol key={member.name}>
            <Text>{member.name}</Text>
          </ol>
        ))}
      </FlexContainer>
    </FlexContainer>
  );
};
