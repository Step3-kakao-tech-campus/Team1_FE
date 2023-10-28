import { TotalWorkedTimeData, UserData } from 'apis/types';
import { atom } from 'jotai';
import { getLoginData } from 'utils/loginDatahandlers';

const isAdmin = getLoginData().isAdmin;

export const workTimeAtom = atom<TotalWorkedTimeData>({ monthly: 0, weekly: 0 });
export const memberAtom = atom<MemberType>(
  isAdmin ? { userId: 0, name: '', isSelected: false } : { userId: 0, name: '', isSelected: true },
); // 선택된 멤버 정보
export const dateAtom = atom({ date: '', isFixed: false }); // 선택된 날짜 정보
export const monthAtom = atom({ year: new Date().getFullYear(), month: new Date().getMonth() }); // 선택된 달 정보

interface MemberType extends UserData {
  isSelected: boolean;
}
