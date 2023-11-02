import { useMutation } from '@tanstack/react-query';
import { postOpenApplication } from 'apis/admin/application/open';
import { convertPath } from 'apis/convertURI';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { openStepAtom, timeTemplateAtom, weeklyPeopleAtom } from 'pages/admin/ApplicationOpenPage';
import { useNavigate } from 'react-router-dom';

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
