import { useAtom } from 'jotai';
import React, { Suspense } from 'react';
import { selectedWeekAtom } from './SelectWeekPage';
import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import { useQuery } from '@tanstack/react-query';
import useWeekSelector from 'hooks/useWeekSelector';
import { getApplyStatus } from 'apis/adminApplication';
import DailyWorkersTemplate from 'components/@commons-feature/calendar/DailyWorkersTemplate';
import { dateToString } from 'utils/dateToString';
import { getDailyWorkers } from 'apis/getSchedule';

const WeeklyDatail = (): JSX.Element => {
  const [selectedWeek] = useAtom(selectedWeekAtom);

  switch (selectedWeek.weekStatus) {
    case 'allocatable':
      return <OpenDetail startWeekDate={selectedWeek.startWeekDate} />;
    case 'inProgress':
      return (
        <Suspense>
          <InProgressDetail startWeekDate={selectedWeek.startWeekDate} />
        </Suspense>
      );
    case 'closed':
      return (
        <Suspense>
          <ClosedDetail startWeekDate={selectedWeek.startWeekDate} />
        </Suspense>
      );
  }
  return <Text>주차를 선택해 주세요</Text>;
};

export default WeeklyDatail;

const OpenDetail = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const navigate = useNavigate();
  const openHandler = () => {
    navigate(convertPath('/newSchedule/open'), { state: { startWeekDate: startWeekDate } });
  };
  return <SubmitButton onClick={openHandler}>스케줄 모집 시작하기</SubmitButton>;
};

const InProgressDetail = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const { data: applicantsStatusRes } = useQuery(
    ['getApplyStatus', startWeekDate],
    () => getApplyStatus({ startWeekDate: startWeekDate }),
    { suspense: true },
  );
  const navigate = useNavigate();

  const closeHandler = () => {
    navigate(convertPath('/newSchedule/close'), { state: { startWeekDate: startWeekDate } });
  };

  const { day, WeekBarComponent } = useWeekSelector(0);
  return (
    <>
      <SubmitButton onClick={closeHandler}>모집 마감하고 배정하기</SubmitButton>
      <WeekBarComponent />
      <DailyWorkersTemplate dailyData={applicantsStatusRes?.data.applyStatus[day]} />
    </>
  );
};

const ClosedDetail = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const { day, WeekBarComponent } = useWeekSelector(0);
  const [y, m, d] = startWeekDate.split('-').map((e) => Number.parseInt(e));
  const date = dateToString(new Date(y, m, d + day));

  const { data: scheduleRes } = useQuery(['getDailyWorkers', day], () => getDailyWorkers({ date: date }), {
    suspense: true,
  });

  return (
    <>
      <WeekBarComponent />
      <DailyWorkersTemplate dailyData={scheduleRes?.data.schedule} />
    </>
  );
};
