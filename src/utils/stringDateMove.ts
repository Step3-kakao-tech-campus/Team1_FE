import { dateToString } from './dateToString';

export const stringDateMove = (stringDate: string, dx: number) => {
  const [y, m, d] = stringDate.split('-').map((e) => Number.parseInt(e));
  const dateObj = new Date(y, m, d + dx);
  return dateToString(dateObj);
};
