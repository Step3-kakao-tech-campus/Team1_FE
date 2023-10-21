import { convertPath } from 'apis/convertURI';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MySch, MySchFill, Start, StartFill } from './Icons';
import { Box, IconCont, MenuBtn, TextCont } from './BottomNBStyles';

export const AdminBottomNB = (): JSX.Element => {
  return (
    <Box>
      <Menu
        text="모집 시작"
        icon={<Start />}
        iconFill={<StartFill />}
        path={['/newSchedule', '/newSchedule/open', '/newSchedule/close']}
      />
      <Menu text="확정 스케줄" icon={<MySch />} iconFill={<MySchFill />} path={['/']} />
    </Box>
  );
};

export const AlbaBottomNB = (): JSX.Element => {
  return (
    <Box>
      <Menu text="신청하기" icon={<Start />} iconFill={<StartFill />} path={['/apply', '/apply/selectTimes']} />
      <Menu text="확정 스케줄" icon={<MySch />} iconFill={<MySchFill />} path={['/']} />
    </Box>
  );
};

const Menu = ({ text, icon, iconFill, path }: MenuProps): JSX.Element => {
  const navigate = useNavigate();
  const nowPath = useLocation().pathname;
  return (
    <MenuBtn onClick={() => navigate(convertPath(path[0]))}>
      <IconCont>{path.includes(nowPath) ? iconFill : icon}</IconCont>
      <TextCont>{text}</TextCont>
    </MenuBtn>
  );
};

interface MenuProps {
  text: string;
  icon: JSX.Element;
  iconFill: JSX.Element;
  path: string[];
}
