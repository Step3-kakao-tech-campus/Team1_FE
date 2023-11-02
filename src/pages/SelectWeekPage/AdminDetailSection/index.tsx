import { useAtomValue } from 'jotai';
import React, { Suspense } from 'react';
import Text from 'components/@commons/Text';
import Loader from 'components/Suspenses/Loader';
import { selectedWeekAtom } from '../states';
import SubmitButton from 'components/@commons/SubmitButton';
import useWeeklyDetail from 'hooks/SelectWeekPage/useWeeklyDetail';
import { DailyWorkersTable } from 'components/DailyWorkersTable';
import useWeekSelector from 'hooks/useWeekSelector';
import { useGetApplyStatus } from 'hooks/SelectWeekPage/fetch';
import { useGetDailyWorkers } from 'hooks/SelectWeekPage/fetch';

const AdminDetailSection = (): JSX.Element => {
  const selectedWeek = useAtomValue(selectedWeekAtom);

  switch (selectedWeek.weekStatus) {
    case 'allocatable':
      return <OpenDetail />;
    case 'inProgress':
      return (
        <Suspense fallback={<Loader />}>
          <InProgressDetail />
        </Suspense>
      );
    case 'closed':
      return (
        <Suspense fallback={<Loader />}>
          <ClosedDetail />
        </Suspense>
      );
  }
  return <Text>주차를 선택해 주세요</Text>;
};

export default AdminDetailSection;

const OpenDetail = (): JSX.Element => {
  const { openHandler } = useWeeklyDetail();
  return <SubmitButton onClick={openHandler}>스케줄 모집 시작하기</SubmitButton>;
};

const InProgressDetail = (): JSX.Element => {
  const { day, WeekBarComponent } = useWeekSelector(0);
  const { applicantsStatusRes } = useGetApplyStatus();
  const { closeHandler } = useWeeklyDetail();

  return (
    <>
      <SubmitButton onClick={closeHandler}>모집 마감하고 배정하기</SubmitButton>
      <WeekBarComponent />
      <DailyWorkersTable dailyData={applicantsStatusRes?.applyStatus[day]} />
    </>
  );
};

const ClosedDetail = (): JSX.Element => {
  const { day, WeekBarComponent } = useWeekSelector(0);
  const { scheduleRes } = useGetDailyWorkers(day);

  if (scheduleRes === null) {
    return <Text>스케줄 정보 없음</Text>;
  }
  return (
    <>
      <WeekBarComponent />
      <DailyWorkersTable dailyData={scheduleRes?.schedule} />
    </>
  );
};
