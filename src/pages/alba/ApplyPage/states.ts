import { SelectedTimeData } from 'apis/types';
import { atom } from 'jotai';
import weekdayArray from 'utils/weekdayArray';

export const weeklySelectAtom = atom<SelectedTimeData[][]>(weekdayArray.map(() => []));
