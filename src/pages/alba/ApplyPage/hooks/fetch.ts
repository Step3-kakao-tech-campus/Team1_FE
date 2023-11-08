import { useMutation, useQuery } from '@tanstack/react-query';
import { getApplyForm, putApply } from 'apis/alba/apply';
import { useAtomValue, useSetAtom } from 'jotai';
import { weeklySelectAtom } from 'pages/alba/ApplyPage/states';
import React from 'react';

export const useGetApplyForm = (startWeekDate: string) => {
  const setWeeklySelect = useSetAtom(weeklySelectAtom);

  const { data } = useQuery(
    ['getApplyForm', startWeekDate],
    () =>
      getApplyForm({
        startWeekDate: startWeekDate,
      }),
    {
      suspense: true,
      staleTime: 3600 * 1000,
      cacheTime: 3600 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  React.useEffect(() => {
    if (data === undefined) return;
    setWeeklySelect(data.selected);
  }, [data]);

  return { data };
};

export const usePutApplyForm = (startWeekDate: string, onSuccess: () => void) => {
  const weeklySelect = useAtomValue(weeklySelectAtom);

  const { mutate } = useMutation(() => putApply({ weekStartDate: startWeekDate, apply: weeklySelect }), {
    onSuccess: onSuccess,
  });

  return { mutate };
};
