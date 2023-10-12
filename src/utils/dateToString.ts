export const dateToString = (dateObject: Date) => {
  const year = String(dateObject.getFullYear());
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const date = String(dateObject.getDate()).padStart(2, '0');
  return `${year}-${month}-${date}`;
};
