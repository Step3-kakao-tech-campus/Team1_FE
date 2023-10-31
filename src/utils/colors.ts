const colors = ['#DEFFE1', '#FFEACB', '#DDE7FF', '#F6CEF5', '#CEF6F5', '#ECE0F8', '#FCF888', '#FECACB'];

export const timeColors = (i: number) => {
  return colors[i % 8];
};
