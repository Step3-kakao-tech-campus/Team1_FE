import React, { useState, useEffect } from 'react';
import { getApplyForm } from 'apis/alba/apply';
import { useAtom, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { weeklySelectAtom } from 'pages/alba/ApplyPage';
import { TimeData } from 'apis/admin/application';

const useApply = (startWeekDate: string) => {
  const query = useQuery(['getApplyForm', startWeekDate], () => getApplyForm({ startWeekDate: startWeekDate }), {
    suspense: true,
  });

  const setWeeklySelect = useSetAtom(weeklySelectAtom);
  const [template, setTemplate] = useState<{ [index: number]: TimeData }>();

  useEffect(() => {
    if (query.data === undefined) return;
    setWeeklySelect(query.data.selected);
    setTemplate(query.data.templates);
  }, [query.data]);

  const findTimeData = (workTimeId: number): TimeData => {
    if (template === undefined) {
      return { title: '', startTime: '', endTime: '' };
    }
    return template[workTimeId];
  };

  return { query, findTimeData };
};

export default useApply;
