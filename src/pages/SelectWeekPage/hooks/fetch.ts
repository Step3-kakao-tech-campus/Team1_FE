import { useQuery } from '@tanstack/react-query';
import { getApplyStatus } from 'apis/admin/application/status';
import { getWeekProgress } from 'apis/weekProgress';
import { useAtomValue } from 'jotai';
import { selectedWeekAtom, weekStatusMonthAtom } from 'pages/SelectWeekPage/states';

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
