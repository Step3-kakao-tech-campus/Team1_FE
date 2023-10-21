import React from 'react';
import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import SubmitButton from 'components/@commons/SubmitButton';

const OpenDetail = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const navigate = useNavigate();
  const openHandler = () => {
    navigate(convertPath('/newSchedule/open'), { state: { startWeekDate: startWeekDate } });
  };
  return <SubmitButton onClick={openHandler}>스케줄 모집 시작하기</SubmitButton>;
};

export default OpenDetail;
