import React from 'react';
import FlexContainer from '../@commons/FlexContainer';
import styled from 'styled-components';

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
  font-size: 2vw;
  @media screen and (min-width: ${({ theme }) => theme.window.tabletMin}) {
    font-size: ${({ theme }) => theme.fonts.fontSize.xs};
  }
`;

export const Badge = styled.div<{ $time?: string }>`
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
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 11;
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
  $aspectRatio: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}>`
  position: relative;

  width: 100%;
  aspect-ratio: ${(props) => (props.$aspectRatio ? props.$aspectRatio : 'none')};

  @media screen and (max-width: 340px) {
    aspect-ratio: ${(props) => (props.$aspectRatio ? Number.parseInt(props.$aspectRatio) * 0.9 : 'none')};
  }

  border: 0.35px solid;
  border-color: ${({ theme }) => theme.color.lightGray};
  background-color: ${(props) => (props.$disabled ? props.theme.color.lightGray : props.theme.color.backgroundColor)};

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 4px;
`;

export const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
`;

export const MonthBox = styled(FlexContainer)`
  gap: 0;
  flex-direction: column;
  border: 0.35px solid;
  border-color: ${({ theme }) => theme.color.lightGray};
`;
