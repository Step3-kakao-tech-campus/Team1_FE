import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import styled from 'styled-components';
import weekdayArray from 'utils/weekdayArray';

const WeekBar = ({ day, selectDayHandler }: { day: number; selectDayHandler: (i: number) => void }): JSX.Element => {
  return (
    <FlexContainer $direction="row" $wFull $justify="space-between" $padding="0 8px" data-testid="요일선택바">
      {weekdayArray.map((e, i) => (
        <Button key={e.kor} onClick={() => selectDayHandler(i)} $isSelected={day === i}>
          <Text>{e.kor}</Text>
        </Button>
      ))}
    </FlexContainer>
  );
};

export default WeekBar;

const Button = styled.button<{ $isSelected: boolean }>`
  width: 10%;
  aspect-ratio: 1;

  background: ${(props) => (props.$isSelected ? props.theme.color.yellow : props.theme.color.lightGray)};
  border: 1px solid;
  border-color: ${({ theme }) => theme.color.textColor};
  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
