import React, { useState } from 'react';
import {
  HeaderContainer,
  HeaderInnerBox,
  HeaderButton,
  HeaderLeftMenuGroup,
  HeaderRightMenuGroup,
} from 'components/HeaderNB/HeaderNBStyels';
import { Alarm, Hamburger } from './icons';
import Sidebar from 'components/Sidebar/Sidebar';
import Text from 'components/@commons/Text';
import { useLocation } from 'react-router-dom';

const HeaderNB = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const nowPath = useLocation().pathname;

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
          <Text size="lg">{adminTitle[nowPath]}</Text>
          <HeaderRightMenuGroup>
            <HeaderButton>
              <Alarm />
            </HeaderButton>
          </HeaderRightMenuGroup>
        </HeaderInnerBox>
      </HeaderContainer>

      {isOpen && <Sidebar closeHandler={() => setIsOpen(false)} />}
    </>
  );
};

export default HeaderNB;
