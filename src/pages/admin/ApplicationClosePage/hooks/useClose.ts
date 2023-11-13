import { useMutation } from '@tanstack/react-query';
import { postRecommends } from 'apis/admin/application/close';
import { convertPath } from 'apis/convertURI';
import { useSetAtom } from 'jotai';
import { selectedWeekAtom } from 'pages/SelectWeekPage/states';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useClose = (startWeekDate: string) => {
  // 선택된 후보, 후보 선택시 상태 업데이트
  const [candidate, setCandidate] = useState(0);
  const setSelectedWeek = useSetAtom(selectedWeekAtom);
  // 제출 클릭시 post 요청
  const navigate = useNavigate();
  const { mutate } = useMutation(
    ['postRecommends'],
    () => postRecommends({ weekStartDate: startWeekDate, selection: candidate + 1 }),
    {
      onSuccess: () => {
        navigate(convertPath('/'));
        setSelectedWeek({ startWeekDate: '', weekStatus: '' });
      },
    },
  );
  const submitHandler = () => {
    mutate();
  };

  return { candidate, setCandidate, submitHandler };
};

export default useClose;
