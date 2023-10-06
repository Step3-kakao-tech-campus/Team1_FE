import instance from 'apis/instance';

export const getMonthly = async (year: number, month: number, memberId: number) => {
  const response = await instance.post(`/schedule/monthly`, {
    memberId: memberId,
    month: month,
    year: year,
  });
  return await nowMonthDate(year, month, response.data.schedule);
};

export const getDaily = async (year: number, month: number, date: number) => {
  return await instance.post(`/schedule/daily`, {
    date: date,
    month: month,
    year: year,
  });
};

// 받은 객체를 3차원 배열로
const nowMonthDate = (year: number, month: number, data: any) => {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  console.log(year, month, 1, firstDay);
  const dates = [];
  // 저번달 끝부분
  for (let i = -firstDay + 1; i <= 0; i++) {
    dates.push(i);
  }
  // 이번달
  for (let i = 1; i <= lastDate; i++) {
    dates.push(i);
  }

  // 다음달 시작부분
  const leftDates = 35 - dates.length;
  for (let i = lastDate + 1; i <= leftDates + lastDate; i++) {
    dates.push(i);
  }

  // 요일로 자르기
  const monthArr = [];
  for (let i = 0; i < 5; i++) {
    const weekArr = dates.slice(i * 7, (i + 1) * 7);
    const weeklyDataArr = weekArr.map((date) => ({ date: date, timeList: data[date] }));
    monthArr.push(weeklyDataArr);
  }
  console.log(monthArr);
  return monthArr;
};
