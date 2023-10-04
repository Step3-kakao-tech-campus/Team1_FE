import React, { useEffect } from 'react';
import FlexContainer from '../FlexContainer';
import PageContainer from '../PageContainer';
import styled from 'styled-components';

interface Props {}

const mapGenerator = (n: number): number[] => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
};

interface DataType {
  [index: string]: string[];
}
const dataGenerator = (lastDate: number): DataType => {
  const obj: DataType = {};
  for (let i = 1; i <= lastDate; i++) {
    obj[`${i}`] = ['오픈'];
  }
  return obj;
};

const nowMonthDate = (year: number, month: number, data: DataType) => {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

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
    const weeklyDataArr = weekArr.map((date) => ({ date: date, time: data[`${date}`] }));
    monthArr.push(weeklyDataArr);
  }
  console.log(monthArr);
  return monthArr;
};

const Calendar = ({}: Props): JSX.Element => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const data = dataGenerator(new Date(year, month, 0).getDate());
  const dateArr = nowMonthDate(year, month, data);

  return (
    <PageContainer>
      <div>{`${month + 1} 월`}</div>
      <MonthBox $wFull>
        {dateArr.map((weekArray, i) => (
          <WeekBox $wFull key={`${i}주`}>
            {weekArray.map((obj) => (
              <DayBox key={obj.date} date={new Date(year, month, obj.date).getDate()} time={obj.time}></DayBox>
            ))}
          </WeekBox>
        ))}
      </MonthBox>
    </PageContainer>
  );
};

export default Calendar;

interface DayProps {
  date: number;
  time: string[];
  children?: any;
}
const DayBox = ({ date, time }: DayProps): JSX.Element => {
  return (
    <StyeldDayBox>
      <div>{date}</div>
      <div>{time}</div>
    </StyeldDayBox>
  );
};

const StyeldDayBox = styled(FlexContainer)`
  width: 100%;
  border: 0.35px solid;
  border-color: ${({ theme }) => theme.color.lightGray};
  aspect-ratio: 1;
  justify-content: start;
`;

const WeekBox = styled(FlexContainer)`
  gap: 0;
  flex-direction: row;
`;

const MonthBox = styled(FlexContainer)`
  gap: 0;
  flex-direction: column;
  border: 0.35px solid;
  border-color: ${({ theme }) => theme.color.lightGray};
`;
