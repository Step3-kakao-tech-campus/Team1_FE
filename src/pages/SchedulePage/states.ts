import { atom } from 'jotai';

export const workTimeAtom = atom({ monthly: 0, weekly: 0 });
export const memberAtom = atom<MemberType>({ memberId: 0, name: '' }); // 선택된 멤버 정보
export const dateAtom = atom({ date: '', isFixed: false }); // 선택된 날짜 정보
export const monthAtom = atom({ year: new Date().getFullYear(), month: new Date().getMonth() }); // 선택된 달 정보

interface MemberType {
  memberId: number | null;
  name: string;
}
