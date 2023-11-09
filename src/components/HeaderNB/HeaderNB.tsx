import Text from 'components/@commons/Text';
import { Hamburger } from 'components/@commons/icons';
import {
  HeaderButton,
  HeaderContainer,
  HeaderInnerBox,
  HeaderLeftMenuGroup,
  HeaderTitleCont,
} from 'components/HeaderNB/HeaderNBStyels';
import Sidebar from 'components/Sidebar';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loginDatahandlers } from 'utils/loginDatahandlers';

const isAdmin = loginDatahandlers.getLoginData().isAdmin;

const HeaderNB = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const nowPath = useLocation().pathname;

  return (
    <>
      <HeaderContainer>
        <HeaderInnerBox>
          <HeaderLeftMenuGroup>
            <HeaderButton onClick={() => setIsOpen(true)} aria-label="메뉴">
              <Hamburger />
            </HeaderButton>
          </HeaderLeftMenuGroup>
          <HeaderTitleCont>
            <Text size="lg" key={isAdmin + nowPath} data-testid="페이지제목">
              {isAdmin ? adminTitle[nowPath] : albaTitle[nowPath]}
            </Text>
          </HeaderTitleCont>
        </HeaderInnerBox>
      </HeaderContainer>

      {isOpen && <Sidebar closeHandler={() => setIsOpen(false)} />}
    </>
  );
};

export default HeaderNB;

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
