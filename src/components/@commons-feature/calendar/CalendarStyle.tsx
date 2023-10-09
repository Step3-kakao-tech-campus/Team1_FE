import React from 'react';
import FlexContainer from '../../@commons/FlexContainer';
import styled from 'styled-components';

export const DateCont = styled.div<{ $isToday: boolean }>`
  background-color: ${(props) => (props.$isToday ? props.theme.color.yellow : null)};
  width: 20px;
  height: 20px;
  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Badge = styled.div<{ $time?: string }>`
  height: 100%;
  background-color: ${(props) =>
    props.$time &&
    (props.$time === '오픈'
      ? props.theme.color.open
      : props.$time === '미들'
      ? props.theme.color.middle
      : props.theme.color.close)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BadgeCont = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const OutterDayBox = styled(FlexContainer)<{
  $disabled: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}>`
  width: 100%;
  aspect-ratio: 0.8;

  border: 0.35px solid;
  border-color: ${({ theme }) => theme.color.lightGray};

  background-color: ${(props) => (props.$disabled ? props.theme.color.lightGray : props.theme.color.backgroundColor)};

  cursor: pointer;
`;

export const InnerDayBox = styled.div<{ $isSelected: boolean }>`
  height: 100%;
  justify-content: start;
  align-items: start;

  gap: 4px;
  padding: 2px 0;
  box-shadow: ${(props) => (props.$isSelected ? '0 0 0 3px #FFDF39 inset' : '0')};
  background-color: ${(props) => (props.$isSelected ? 'rgba(255, 223, 57, 0.2)' : null)};
`;

export const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const MonthBox = styled(FlexContainer)`
  gap: 0;
  flex-direction: column;
  border: 0.35px solid;
  border-color: ${({ theme }) => theme.color.lightGray};
`;
