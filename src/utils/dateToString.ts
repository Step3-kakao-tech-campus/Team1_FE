export const dateToString = (dateObject: Date) => {
  const year = String(dateObject.getFullYear());
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const date = String(dateObject.getDate()).padStart(2, '0');
  return `${year}-${month}-${date}`;
};

export const stringDateIsToday = (stringDate: string) => {
  return stringDate === dateToString(new Date());
};

export const stringDateMove = (stringDate: string, dx: number) => {
  const [y, m, d] = stringDate.split('-').map((e) => Number.parseInt(e));
  const dateObj = new Date(y, m - 1, d + dx);
  return dateToString(dateObj);
};

export const stringDateMoveKor = (string: string, dx: number) => {
  const [y, m, d] = string.split('-').map((e) => Number.parseInt(e));
  const date = new Date(y, m - 1, d + dx);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};
