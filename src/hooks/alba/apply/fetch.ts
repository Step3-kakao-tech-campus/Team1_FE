import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getApplyForm, putApply } from 'apis/alba/apply';
import { weeklySelectAtom } from 'pages/alba/ApplyPage';

export const useGetApplyForm = (startWeekDate: string) => {
  const setWeeklySelect = useSetAtom(weeklySelectAtom);
  const [isLoading, setIsLoading] = React.useState(true);

  const { data } = useQuery(
    ['getApplyForm', startWeekDate],
    () =>
      getApplyForm({
        startWeekDate: startWeekDate,
      }),
    {
      enabled: startWeekDate !== '',
      onSuccess: (data) => {
        if (data === undefined) return;
        setWeeklySelect(data.selected);
        setIsLoading(false);
      },
    },
  );

  return { data, isLoading };
};

export const usePutApplyForm = (startWeekDate: string, onSuccess: () => void) => {
  const weeklySelect = useAtomValue(weeklySelectAtom);

  const { mutate } = useMutation(() => putApply({ weekStartDate: startWeekDate, apply: weeklySelect }), {
    onSuccess: onSuccess,
  });

  return { mutate };
};
