import React, { useEffect } from 'react';
import FlexContainer from '../FlexContainer';
import PageContainer from '../PageContainer';
import styled from 'styled-components';
import { getDailyWorkers, getMonthly } from 'apis/getSchedule';
import { useQuery } from '@tanstack/react-query';

interface Props {
  selectedId: number;
}

interface DailyData {
  date: string;
  workTime: string[];
}

const Calendar = ({ selectedId }: Props): JSX.Element => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const { data: obj } = useQuery(['getMonthly', year, month, selectedId], () => getMonthly(year, month, selectedId), {
    suspense: true,
    enabled: selectedId !== null && selectedId !== 0,
  });

  useEffect(() => {
    console.log(obj?.table);
  }, [obj]);

  return (
    <>
      <div>{`${month + 1} 월`}</div>
      {!!obj && (
        <MonthBox $wFull>
          {obj.table.map((weekArray: DailyData[], i) => (
            <WeekBox $wFull key={`${i}주`}>
              {weekArray.map((e: DailyData) => (
                <DayBox key={e.date} dateString={e.date} timeList={e.workTime}></DayBox>
              ))}
            </WeekBox>
          ))}
        </MonthBox>
      )}
    </>
  );
};

export default Calendar;

interface DayBoxProps {
  dateString: string;
  timeList: string[] | null;
}

const DayBox = ({ dateString, timeList }: DayBoxProps): JSX.Element => {
  const [year, month, date] = dateString.split('-').map((e) => Number.parseInt(e));

  return (
    <StyeldDayBox onClick={() => getDailyWorkers(year, month, date)} active={!timeList}>
      <div>{date}</div>
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

const Badge = styled.div<{ $time?: string }>`
  width: 100%;
  height: 100%;
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
  height: 24px;
`;

const StyeldDayBox = styled(FlexContainer)<{ active?: boolean }>`
  width: 100%;
  border: 0.35px solid;
  border-color: ${({ theme }) => theme.color.lightGray};
  background-color: ${(props) => (props.active ? props.theme.color.lightGray : props.theme.color.backgroundColor)};
  aspect-ratio: 0.75;
  justify-content: start;
  gap: 0;
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
