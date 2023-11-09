import { useAtom, useSetAtom } from 'jotai';
import { openStepAtom, timeTemplateAtom, weeklyPeopleAtom } from 'pages/admin/ApplicationOpenPage/states';
const useTimeTemplate = () => {
  /* 1. 초기 선언 */

  const [timeTemplate, setTimeTemplate] = useAtom(timeTemplateAtom);
  const setWeeklyAmount = useSetAtom(weeklyPeopleAtom);

  /* 2. 업데이트 */

  // 시간대 이름/시간 변경 (입력 값 반영)
  const updateTimeHandler = (value: string, id: string, timeIndex: number): void => {
    setTimeTemplate((prev) => prev.map((object, index) => (timeIndex !== index ? object : { ...object, [id]: value })));
  };

  // 시간대 삭제
  const deleteHandler = (i: number) => {
    setTimeTemplate((prev) => prev.filter((e, index) => i !== index));
    setWeeklyAmount((prev) => {
      return prev.map((daily) => daily.filter((amount, index) => i !== index));
    });
  };

  // 시간대 추가
  const addHandler = () => {
    setTimeTemplate((prev) => [...prev, { title: '', startTime: '00:00', endTime: '00:00' }]);
    setWeeklyAmount((prev) => prev.map((dailyArr) => [...dailyArr, 0]));
  };

  /* 3. 다음 단계로 넘어가기 : 데이터 저장 */

  const setStep = useSetAtom(openStepAtom);
  const goNextHandler = () => {
    const removeEmptyTime = timeTemplate.filter((e) => e.title.length > 0);
    if (removeEmptyTime.length === 0) return;
    if (removeEmptyTime.some((e) => e.startTime === e.endTime)) {
      alert('시간을 올바르게 입력하세요');
      return;
    }

    setTimeTemplate(removeEmptyTime);
    setStep('setAmount');
  };

  /* 4. 데이터 초기화 */
  const initializeOpenData = () => {
    setWeeklyAmount([new Array(7).fill([])]);
    setTimeTemplate([]);
    setStep('setTime');
  };

  return { timeTemplate, updateTimeHandler, deleteHandler, addHandler, goNextHandler, initializeOpenData };
};

export default useTimeTemplate;
