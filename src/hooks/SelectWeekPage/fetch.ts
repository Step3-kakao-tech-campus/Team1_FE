import { useQuery } from '@tanstack/react-query';
import { getApplyStatus } from 'apis/admin/application/status';
import { getDailyWorkers } from 'apis/schedule/getDailyWorkers';
import { getWeekProgress } from 'apis/weekProgress';
import { useAtomValue } from 'jotai';
import { selectedWeekAtom, weekStatusMonthAtom } from 'pages/SelectWeekPage/states';
import { stringDateMove } from 'utils/dateToString';

export const useGetWeekProgress = () => {
  const { year, month } = useAtomValue(weekStatusMonthAtom);

  const { data: weekStatusData } = useQuery(
    ['getWeekProgress', year, month, 1],
    () => getWeekProgress({ year: year, month: month }),
    {
      suspense: true,
    },
  );

  return { weekStatusData };
};

export const useGetApplyStatus = () => {
  const startWeekDate = useAtomValue(selectedWeekAtom).startWeekDate;
  const { data: applicantsStatusRes } = useQuery(
    ['getApplyStatus', startWeekDate],
    () => getApplyStatus({ startWeekDate: startWeekDate }),
    { suspense: true },
  );
  return { applicantsStatusRes };
};

export const useGetDailyWorkers = (day: number) => {
  const startWeekDate = useAtomValue(selectedWeekAtom).startWeekDate;
  const selectedDate = stringDateMove(startWeekDate, day);
  const { data: scheduleRes } = useQuery(
    ['getDailyWorkers', 'newSchedule', selectedDate],
    () =>
      getDailyWorkers({ selectedDate: selectedDate }).catch((err) => {
        if (err.response?.data?.code === -11001) {
          return null;
        } else {
          throw err;
        }
      }),
    {
      suspense: true,
    },
  );

  return { scheduleRes };
};
