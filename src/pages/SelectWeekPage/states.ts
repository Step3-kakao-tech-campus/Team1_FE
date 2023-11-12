import { atom } from 'jotai';
import { SelectedMonthData } from 'pages/SchedulePage/states';

const weekStatusInitial = { year: new Date().getFullYear(), month: new Date().getMonth() };
const selectedWeekInitial = { startWeekDate: '', weekStatus: '' };

export const selectedWeekAtom = atom(selectedWeekInitial);
export const weekStatusMonthAtom = atom(weekStatusInitial, (get, set, update: SelectedMonthData) => {
  set(weekStatusMonthAtom, update);
  set(selectedWeekAtom, selectedWeekInitial);
});
