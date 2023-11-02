import { selectedWeekAtom } from 'pages/SelectWeekPage/states';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getTimeTemplate, postOpenApplication } from 'apis/admin/application/open';
import { convertPath } from 'apis/convertURI';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { openStepAtom, timeTemplateAtom, weeklyPeopleAtom } from 'pages/admin/ApplicationOpenPage/states';
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

export const useGetOpenTemplate = () => {
  const [timeTemplate, setTimeTemplate] = useAtom(timeTemplateAtom);
  const setWeeklyData = useSetAtom(weeklyPeopleAtom);
  const selectedWeek = useAtomValue(selectedWeekAtom);

  const { data: timeTemplateRes } = useQuery(
    ['getTimeTemplate', selectedWeek],
    () => getTimeTemplate({ startWeekDate: selectedWeek.startWeekDate }),
    {
      suspense: true,
      staleTime: 3600 * 1000,
      cacheTime: 3600 * 1000,
      enabled: timeTemplate.length === 0,
      onSuccess: (data) => {
        if (timeTemplate.length === 0) {
          setTimeTemplate(data.template);
          setWeeklyData(weekdayArray.map(() => data.template.map(() => 0)));
        }
      },
    },
  );

  return { timeTemplateRes };
};
