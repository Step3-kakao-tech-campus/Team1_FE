import { convertPath } from 'apis/convertURI';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Close, CloseFill, MySch, MySchFill, Start, StartFill, Status, StatusFill } from './Icons';
import { Box, IconCont, MenuBtn, TextCont } from './BottomNBStyles';

const BottomNB = (): JSX.Element => {
  return (
    <Box>
      <Menu text="모집 시작" icon={<Start />} iconFill={<StartFill />} path="/newSchedule" />
      <Menu text="모집 현황" icon={<Status />} iconFill={<StatusFill />} path="/newSchedule/status" />
      <Menu text="모집 마감" icon={<Close />} iconFill={<CloseFill />} path="/newSchedule/close" />
      <Menu text="확정 스케줄" icon={<MySch />} iconFill={<MySchFill />} path="/" />
    </Box>
  );
};

export default BottomNB;

const Menu = ({ text, icon, iconFill, path }: MenuProps): JSX.Element => {
  const navigate = useNavigate();
  const nowPath = useLocation().pathname;
  return (
    <MenuBtn onClick={() => navigate(convertPath(path))}>
      <IconCont>{nowPath === path ? iconFill : icon}</IconCont>
      <TextCont>{text}</TextCont>
    </MenuBtn>
  );
};

interface MenuProps {
  text: string;
  icon: JSX.Element;
  iconFill: JSX.Element;
  path: string;
}
