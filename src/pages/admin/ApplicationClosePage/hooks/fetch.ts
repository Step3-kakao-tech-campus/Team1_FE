import { useQuery } from '@tanstack/react-query';
import { getRecommends } from 'apis/admin/application/close';

export const useGetRecommends = (startWeekDate: string) => {
  const { data: recommendsRes } = useQuery(
    ['getRecommends', startWeekDate],
    () => getRecommends({ startWeekDate: startWeekDate }),
    { suspense: true },
  );
  return { recommendsRes };
};
