import { useQueryClient } from '@tanstack/react-query';
import { convertPath } from 'apis/convertURI';
import usePopUpPage from 'hooks/usePopUpPage';
import { useAtomValue } from 'jotai';
import { weeklySelectAtom } from 'pages/alba/ApplyPage/states';
import { useNavigate } from 'react-router-dom';
import { usePutApplyForm } from './fetch';

const usePreviewSelected = (startWeekDate: string) => {
  const weeklySelect = useAtomValue(weeklySelectAtom);
  const { popUpOffHandler } = usePopUpPage();

  // 체크한 시간대만 문자열로 표시
  const checkedTimeOnly = (dayIndex: number) => {
    const processed = weeklySelect[dayIndex].filter((object) => object.isChecked).map((object) => object.title);
    if (processed.length === 0) return '휴무';
    return processed.join(' | ');
  };

  // 수정하러 가기
  const goSelectHandler = () => {
    popUpOffHandler();
  };

  // 제출 요청
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const postOnSuccess = () => {
    navigate(convertPath('/'));
    queryClient.removeQueries(['getApplyForm', startWeekDate]);
    popUpOffHandler();
  };
  const { mutate } = usePutApplyForm(startWeekDate, postOnSuccess);
  const submitApplyHandler = () => {
    mutate();
  };

  return {
    submitApplyHandler,
    goSelectHandler,
    checkedTimeOnly,
  };
};

export default usePreviewSelected;
