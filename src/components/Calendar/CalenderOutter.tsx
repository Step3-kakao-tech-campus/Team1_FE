import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import { NextButton, PrevButton } from 'components/@commons/iconButtons';
import { PrimitiveAtom, useAtom } from 'jotai';
import React from 'react';
import { WeekGrid } from './CalendarStyle';
import weekdayArray from 'utils/weekdayArray';

interface Props {
  children: React.ReactNode;
  monthDataAtom: PrimitiveAtom<{
    year: number;
    month: number;
  }>;
}

const CalenderOutter = ({ children, monthDataAtom }: Props): JSX.Element => {
  const [nowMonth, setNowMonth] = useAtom(monthDataAtom);
  const { year, month } = { ...nowMonth };

  const monthMoveHandler = (dm: number) => {
    const newDateObj = new Date(nowMonth.year, nowMonth.month + dm, 1);
    const newObj = { year: newDateObj.getFullYear(), month: newDateObj.getMonth() };
    setNowMonth((prev) => newObj);
  };

  return (
    <>
      <FlexContainer $direction="row" $justify="space-between">
        <PrevButton onClick={() => monthMoveHandler(-1)} />
        <FlexContainer $direction="row" $gap="12px">
          <Text size="lg" weight="bold">{`${year} 년`}</Text>
          <Text size="lg" weight="bold">{`${month + 1} 월`}</Text>
        </FlexContainer>

        <NextButton onClick={() => monthMoveHandler(+1)} />
      </FlexContainer>
      <DayTitle />
      <>{children}</>
    </>
  );
};

export default CalenderOutter;

const DayTitle = () => {
  return (
    <WeekGrid>
      {weekdayArray.map((e) => (
        <FlexContainer $wFull key={e.eng}>
          <Text size="xs" weight="bold">
            {e.eng}
          </Text>
        </FlexContainer>
      ))}
    </WeekGrid>
  );
};
