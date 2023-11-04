import { DailyWorkersTable, NotFixedDateBox } from 'components/DailyWorkersTable';
import { useGetDailyWorkers } from 'hooks/SchedulePage/fetch';
import { useAtomValue } from 'jotai';
import { dateAtom } from '../states';

const DailyWorkers = (): JSX.Element => {
  const selectedDate = useAtomValue(dateAtom);
  const { scheduleRes, isNotFixed } = useGetDailyWorkers(selectedDate.date, selectedDate.isFixed);

  if (selectedDate.date === '') {
    return <></>;
  }

  if (!selectedDate.isFixed || isNotFixed) {
    return <NotFixedDateBox />;
  }

  return (
    <>
      <DailyWorkersTable dailyData={scheduleRes?.schedule} />
    </>
  );
};

export default DailyWorkers;
