import { convertPath } from 'apis/convertURI';
import { useAtomValue } from 'jotai';
import { selectedWeekAtom } from 'pages/SelectWeekPage/states';
import { useNavigate } from 'react-router-dom';

const useWeeklyDetail = () => {
  const startWeekDate = useAtomValue(selectedWeekAtom).startWeekDate;
  const navigate = useNavigate();

  const gotoOpenApply = () => {
    navigate(convertPath('/newSchedule/open'), { state: { startWeekDate: startWeekDate } });
  };

  const gotoCloseApply = () => {
    navigate(convertPath('/newSchedule/close'), { state: { startWeekDate: startWeekDate } });
  };

  const gotoApply = () => {
    navigate(convertPath('/apply/selectTimes'), { state: { startWeekDate: startWeekDate } });
  };

  return { gotoOpenApply, gotoCloseApply, gotoApply };
};

export default useWeeklyDetail;
