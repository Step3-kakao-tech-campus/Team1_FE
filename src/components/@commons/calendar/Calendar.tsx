import React, { useEffect } from 'react';
import FlexContainer from '../FlexContainer';
import PageContainer from '../PageContainer';
import styled from 'styled-components';
import { getMonthly } from 'apis/getSch';
import { useQuery } from '@tanstack/react-query';

const Calendar = (): JSX.Element => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const { data: obj, isFetching } = useQuery(['getMonthly', month, year], () => getMonthly(year, month));

  return (
    <PageContainer justify="start">
      <div>{`${month + 1} 월`}</div>
      {!!obj && (
        <MonthBox $wFull>
          {obj.map((weekArray, i) => (
            <WeekBox $wFull key={`${i}주`}>
              {weekArray.map((e) => (
                <DayBox key={e.date} date={new Date(year, month, e.date).getDate()} timeList={e.timeList}></DayBox>
              ))}
            </WeekBox>
          ))}
        </MonthBox>
      )}
    </PageContainer>
  );
};

export default Calendar;

const DayBox = ({ date, timeList }: DayProps): JSX.Element => {
  return (
    <StyeldDayBox>
      <BadgeCont>{date}</BadgeCont>
      {!!timeList && (
        <BadgeCont>
          {timeList.map((t) => (
            <Badge key={t} $time={t}>
              {t}
            </Badge>
          ))}
        </BadgeCont>
      )}
    </StyeldDayBox>
  );
};

interface DayProps {
  date: number;
  timeList: string[];
  children?: any;
}

const Badge = styled.div<{ $time?: string }>`
  width: 100%;
  background-color: ${(props) =>
    props.$time &&
    (props.$time === '오픈'
      ? props.theme.color.open
      : props.$time === '미들'
      ? props.theme.color.middle
      : props.theme.color.close)};
`;

const BadgeCont = styled.div`
  width: 100%;
`;

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
