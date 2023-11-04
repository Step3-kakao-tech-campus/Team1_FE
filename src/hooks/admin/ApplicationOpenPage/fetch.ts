import { useMutation, useQuery } from '@tanstack/react-query';
import { getTimeTemplate, postOpenApplication } from 'apis/admin/application/open';
import { convertPath } from 'apis/convertURI';
import { useAtom, useSetAtom } from 'jotai';
import { openStepAtom, timeTemplateAtom, weeklyPeopleAtom } from 'pages/admin/ApplicationOpenPage/states';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import weekdayArray from 'utils/weekdayArray';

export const usePostOpenApplication = (startWeekDate: string) => {
  const [weeklyAmount, setWeeklyAmount] = useAtom(weeklyPeopleAtom);
  const [timeTemplate, setTimeTemplate] = useAtom(timeTemplateAtom);
  const setStep = useSetAtom(openStepAtom);
  const navigate = useNavigate();

  const { mutate: openApplicationMutate } = useMutation(
    ['postAddNewGroup'],
    () =>
      postOpenApplication({
        weeklyAmount: weeklyAmount,
        timeTemplate: timeTemplate,
        startWeekDate: startWeekDate,
      }),
    {
      onSuccess: () => {
        navigate(convertPath('/'));

        // 상태 초기화
        setWeeklyAmount([[], [], [], [], [], [], []]);
        setStep('setTime');
        setTimeTemplate([]);
      },
    },
  );
  return { submitOpenhandler: () => openApplicationMutate() };
};

export const useGetOpenTemplate = (startWeekDate: string) => {
  const setTimeTemplate = useSetAtom(timeTemplateAtom);
  const setWeeklyData = useSetAtom(weeklyPeopleAtom);

  const { data: timeTemplateRes } = useQuery(
    ['getTimeTemplate', startWeekDate],
    () => getTimeTemplate({ startWeekDate: startWeekDate }),
    {
      suspense: true,
      staleTime: 3600 * 1000,
      cacheTime: 3600 * 1000,
      refetchOnMount: false,
    },
  );

  useEffect(() => {
    if (timeTemplateRes === undefined) return;
    setTimeTemplate(timeTemplateRes.template);
    setWeeklyData(weekdayArray.map(() => timeTemplateRes.template.map(() => 0)));
  }, [timeTemplateRes]);

  return { timeTemplateRes };
};
