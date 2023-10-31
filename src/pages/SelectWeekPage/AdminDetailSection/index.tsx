import { useAtomValue } from 'jotai';
import React, { Suspense } from 'react';
import Text from 'components/@commons/Text';
import Loader from 'components/Suspenses/Loader';
import { selectedWeekAtom } from '../states';
import SubmitButton from 'components/@commons/SubmitButton';
import useWeeklyDetail from 'hooks/SelectWeekPage/useWeeklyDetail';
import DailyWorkersTemplate from 'components/DailyWorkers/DailyWorkersTemplate';
import useWeekSelector from 'hooks/useWeekSelector';
import { useGetApplyStatus } from 'hooks/SelectWeekPage/fetch';
import { useGetDailyWorkers } from 'hooks/SelectWeekPage/fetch';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallbackProps } from 'apis/types';

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
        <ErrorBoundary FallbackComponent={NoFixedScheduleError}>
          <Suspense fallback={<Loader />}>
            <ClosedDetail />
          </Suspense>
        </ErrorBoundary>
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
      <DailyWorkersTemplate dailyData={applicantsStatusRes?.applyStatus[day]} />
    </>
  );
};

const ClosedDetail = (): JSX.Element => {
  const { day, WeekBarComponent } = useWeekSelector(0);
  const { scheduleRes } = useGetDailyWorkers(day);

  return (
    <>
      <WeekBarComponent />
      <DailyWorkersTemplate dailyData={scheduleRes?.schedule} />
    </>
  );
};

const NoFixedScheduleError = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  if (error.response?.data?.code === -11001) {
    resetErrorBoundary();
    return <Text>스케줄 정보 없음</Text>;
  }
  throw error;
};
