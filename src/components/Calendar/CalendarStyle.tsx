import React from 'react';
import styled from 'styled-components';
import FlexContainer from '../@commons/FlexContainer';

export const DateCircle = styled.div<{ $isToday: boolean }>`
  background-color: ${(props) => (props.$isToday ? props.theme.color.yellow : null)};
  width: 20px;
  height: 20px;
  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BadgeText = styled.span`
  font-size: ${(props) => props.theme.fonts.fontSize.xs};
  @media screen and (max-width: 340px) {
    font-size: ${({ theme }) => theme.fonts.fontSize.xxs};
  }
`;

export const Badge = styled.ol<{ $color?: string }>`
  background-color: ${(props) => props.$color};

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
`;

export const BadgeCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 11;
  gap: 2px;
`;

export const BorderDayBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 0 3px #ffdf39 inset;
  z-index: 12;
`;

export const OutterDayBox = styled.div<{
  $disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}>`
  position: relative;

  width: 100%;

  border: 0.35px solid;
  border-color: ${({ theme }) => theme.color.lightGray};
  background-color: ${(props) => (props.$disabled ? props.theme.color.lightGray : props.theme.color.backgroundColor)};

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 4px;
`;

export const WeekGrid = styled.div<{
  $aspectRatio?: string;
}>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  aspect-ratio: ${(props) => (props.$aspectRatio ? props.$aspectRatio : 'none')};
`;

export const MonthBox = styled(FlexContainer)`
  gap: 0;
  flex-direction: column;
  border: 0.35px solid;
  border-color: ${({ theme }) => theme.color.lightGray};
`;
