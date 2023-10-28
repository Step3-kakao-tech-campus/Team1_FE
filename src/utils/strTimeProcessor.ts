export const strTimeProcessor = (timeString: string) => {
  return timeString.split(':').slice(0, 2).join(':');
};
