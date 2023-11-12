import { TimeData } from 'apis/types';
import { atom } from 'jotai';

export const timeTemplateAtom = atom<TimeData[]>([]);
export const weeklyPeopleAtom = atom<number[][]>([new Array(7).fill([])]);
export const openStepAtom = atom<'setTime' | 'setAmount'>('setTime');
