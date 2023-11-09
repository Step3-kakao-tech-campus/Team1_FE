import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import { DailyWorkersTable } from 'components/DailyWorkersTable';
import Loader from 'components/Suspenses/Loader';
import useWeekSelector from 'hooks/useWeekSelector';
import { useAtomValue } from 'jotai';
import { useGetDailyWorkers } from 'pages/SchedulePage/hooks/fetch';
import { useGetApplyStatus } from 'pages/SelectWeekPage/hooks/fetch';
import useWeeklyDetail from 'pages/SelectWeekPage/hooks/useWeeklyDetail';
import { Suspense } from 'react';
import { stringDateMove } from 'utils/dateToString';
import { selectedWeekAtom } from '../states';

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
  const { gotoOpenApply } = useWeeklyDetail();
  return <SubmitButton onClick={gotoOpenApply}>스케줄 모집 시작하기</SubmitButton>;
};

const InProgressDetail = (): JSX.Element => {
  const { day, WeekBarComponent } = useWeekSelector(0);
  const { applicantsStatusRes } = useGetApplyStatus();
  const { gotoCloseApply } = useWeeklyDetail();

  return (
    <>
      <SubmitButton onClick={gotoCloseApply}>모집 마감하고 배정하기</SubmitButton>
      <WeekBarComponent />
      <DailyWorkersTable dailyData={applicantsStatusRes?.applyStatus[day]} />
    </>
  );
};

const ClosedDetail = (): JSX.Element => {
  const { day, WeekBarComponent } = useWeekSelector(0);
  const startWeekDate = useAtomValue(selectedWeekAtom).startWeekDate;
  const { scheduleRes, isNotFixed } = useGetDailyWorkers(stringDateMove(startWeekDate, day));

  if (isNotFixed) {
    return <Text>스케줄 정보 없음</Text>;
  }
  return (
    <>
      <WeekBarComponent />
      <DailyWorkersTable dailyData={scheduleRes?.schedule} />
    </>
  );
};
