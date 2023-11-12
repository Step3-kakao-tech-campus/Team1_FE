import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import { NextButton, PrevButton } from 'components/@commons/icons/buttons';
import weekdayArray from 'utils/weekdayArray';
import { WeekGrid } from './CalendarStyle';

const CalenderOutter = ({ selectedMonth, setMonth }: Props): JSX.Element => {
  return (
    <FlexContainer $wFull $gap="24px">
      <MonthSelectBar selectedMonth={selectedMonth} setMonth={setMonth} />
      <DayTitle />
    </FlexContainer>
  );
};

export default CalenderOutter;

const MonthSelectBar = ({ selectedMonth, setMonth }: Props) => {
  const { year, month } = selectedMonth;
  const monthMoveHandler = (dm: number) => {
    const newDateObj = new Date(year, month + dm, 1);
    setMonth({ year: newDateObj.getFullYear(), month: newDateObj.getMonth() });
  };

  return (
    <FlexContainer $direction="row" $justify="space-between" $wFull>
      <PrevButton onClick={() => monthMoveHandler(-1)} />

      <FlexContainer $direction="row" $gap="12px">
        <Text size="lg" weight="bold">{`${year} 년`}</Text>
        <Text size="lg" weight="bold">{`${month + 1} 월`}</Text>
      </FlexContainer>

      <NextButton onClick={() => monthMoveHandler(+1)} />
    </FlexContainer>
  );
};

const DayTitle = () => {
  return (
    <FlexContainer $direction="row" $wFull>
      <WeekGrid>
        {weekdayArray.map((e) => (
          <FlexContainer $wFull key={e.eng}>
            <Text size="xxs" weight="semiBold">
              {e.eng}
            </Text>
          </FlexContainer>
        ))}
      </WeekGrid>
    </FlexContainer>
  );
};

export interface MonthData {
  year: number;
  month: number;
}

interface Props {
  selectedMonth: MonthData;
  setMonth: (monthdata: MonthData) => void;
}
