import { WeekStatusData } from 'apis/types';
import { useSetAtom } from 'jotai';
import { selectedWeekAtom } from 'pages/SelectWeekPage/states';
import { loginDatahandlers } from 'utils/loginDatahandlers';

const useSelectWeek = () => {
  const isAdmin = loginDatahandlers.getLoginData().isAdmin;
  const setSelectedWeek = useSetAtom(selectedWeekAtom);

  const weekOnClickHandler = (weekObj: WeekStatusData) => {
    if (!isAdmin && weekObj.weekStatus !== 'inProgress') return;
    const newObj = { startWeekDate: weekObj.dates[0], weekStatus: weekObj.weekStatus };
    setSelectedWeek(newObj);
  };

  return { weekOnClickHandler };
};

export default useSelectWeek;
