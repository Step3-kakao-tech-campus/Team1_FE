import React, { useState } from 'react';
import {
  HeaderContainer,
  HeaderInnerBox,
  HeaderButton,
  HeaderLeftMenuGroup,
  HeaderRightMenuGroup,
  HeaderTitleCont,
} from 'components/HeaderNB/HeaderNBStyels';
import Sidebar from 'components/Sidebar';
import Text from 'components/@commons/Text';
import { useLocation } from 'react-router-dom';
import { Hamburger } from 'components/@commons/icons';
import { getLoginData } from 'utils/loginDatahandlers';

const HeaderNB = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const nowPath = useLocation().pathname;
  const isAdmin = getLoginData().isAdmin;

  const albaTitle: { [index: string]: string } = {
    '/': '내 스케줄',
    '/apply': '신청하기',
    '/apply/selectTimes': '신청하기',
  };

  const adminTitle: { [index: string]: string } = {
    '/': '확정 스케줄',
    '/newSchedule': '모집하기',
    '/newSchedule/open': '모집 시작하기',
    '/newSchedule/close': '모집 마감하기',
  };

  return (
    <>
      <HeaderContainer>
        <HeaderInnerBox>
          <HeaderLeftMenuGroup>
            <HeaderButton onClick={() => setIsOpen(true)}>
              <Hamburger />
            </HeaderButton>
          </HeaderLeftMenuGroup>
          <HeaderTitleCont>
            <Text size="lg">{isAdmin ? adminTitle[nowPath] : albaTitle[nowPath]}</Text>
          </HeaderTitleCont>
          {/* <HeaderRightMenuGroup>
            <HeaderButton>
              <Alarm />
            </HeaderButton>
          </HeaderRightMenuGroup> */}
        </HeaderInnerBox>
      </HeaderContainer>

      {isOpen && <Sidebar closeHandler={() => setIsOpen(false)} />}
    </>
  );
};

export default HeaderNB;
