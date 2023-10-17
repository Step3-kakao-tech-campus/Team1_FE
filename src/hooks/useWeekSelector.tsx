import FlexContainer from 'components/@commons/FlexContainer';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import weekdayArray from 'utils/weekdayArray';

const useWeekSelector = (initial: number) => {
  const [day, setDay] = useState(initial);

  const selectDayHandler = useCallback(
    (i: number) => {
      setDay((prev) => i);
    },
    [day],
  );

  const WeekBarComponent = (): JSX.Element => {
    return (
      <FlexContainer $direction="row" $wFull $justify="space-between" $padding="0 8px">
        {weekdayArray.map((e, i) => (
          <Button key={e.kor} onClick={() => selectDayHandler(i)} $isSelected={day === i}>
            {e.kor}
          </Button>
        ))}
      </FlexContainer>
    );
  };

  return { day, selectDayHandler, WeekBarComponent };
};

export default useWeekSelector;

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
