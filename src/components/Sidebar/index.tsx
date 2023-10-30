import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from 'apis/userInfo';
import { convertPath } from 'apis/convertURI';
import useLogin from 'hooks/useLogin';
import useModal from 'hooks/useModal';
import GetInviteKey from 'components/modals/GetInviteKey';
import { HorizontalLine, SidebarBackground, SidebarBox } from './styles';
import Text from '../@commons/Text';
import FlexContainer from '../@commons/FlexContainer';
import { UserData } from 'apis/types';

const Sidebar = ({ closeHandler }: { closeHandler: () => void }): JSX.Element => {
  const { data: memberList } = useQuery(['members'], getMyInfo);

  const loginInfo = { userData: { userName: 'aa', isAdmin: true, groupName: 'aa' } };

  const navigate = useNavigate();
  const { logout } = useLogin('/');
  const { modalOnHandler } = useModal();

  const guideHandler = () => {
    closeHandler();
    navigate(convertPath('/'));
  };

  return (
    <SidebarBackground onClick={closeHandler}>
      <SidebarBox onClick={(e) => e.stopPropagation()}>
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
            <FlexContainer onClick={guideHandler}>
              <Text>사용 가이드</Text>
            </FlexContainer>
            <FlexContainer onClick={logout}>
              <Text>로그아웃</Text>
            </FlexContainer>
            {loginInfo.userData.isAdmin && (
              <FlexContainer onClick={() => modalOnHandler(<GetInviteKey />)}>
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
            {memberList?.data.members.map((member: UserData) => (
              <ol key={member.userId}>
                <Text>{member.name}</Text>
              </ol>
            ))}
          </FlexContainer>
        </FlexContainer>
      </SidebarBox>
    </SidebarBackground>
  );
};

export default Sidebar;
