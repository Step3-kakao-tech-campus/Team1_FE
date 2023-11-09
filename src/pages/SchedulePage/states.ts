import { TotalWorkedTimeData, UserData } from 'apis/types';
import { atom } from 'jotai';
import { loginDatahandlers } from 'utils/loginDatahandlers';

const isAdmin = loginDatahandlers.getLoginData().isAdmin;

const workTimeDefault = { monthly: 0, weekly: 0 };
const memberDefault = isAdmin ? { userId: 0, name: '', isSelected: false } : { userId: 0, name: '', isSelected: true };
const dateDefault = { date: '', isFixed: false };
const monthDefault = { year: new Date().getFullYear(), month: new Date().getMonth() };

export const workTimeAtom = atom<TotalWorkedTimeData>(workTimeDefault);
export const memberAtom = atom<MemberType>(memberDefault); // 선택된 멤버 정보
export const dateAtom = atom(dateDefault); // 선택된 날짜 정보
export const monthAtom = atom(monthDefault, (get, set, update: SelectedMonthData) => {
  set(monthAtom, update);
  set(dateAtom, dateDefault);
});

export interface SelectedMonthData {
  year: number;
  month: number;
}

export interface SelectedDateData {
  date: string;
  isFixed: boolean;
}

interface MemberType extends UserData {
  isSelected: boolean;
}
