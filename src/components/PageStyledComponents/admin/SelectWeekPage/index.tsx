import { WeekStatusTypes } from 'apis/types';
import styled from 'styled-components';

export const BorderWeekBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 11;
  box-shadow: 0 0 0 3px #ffdf39 inset;
`;

export const WeekContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const WeekStatusBar = styled.div<{ $status: WeekStatusTypes }>`
  width: 100%;
  position: absolute;
  bottom: 10%;
  z-index: 10;
  background-color: ${(props) =>
    props.$status === 'allocatable'
      ? props.theme.color.lightBlue
      : props.$status === 'inProgress'
      ? props.theme.color.lightYellow
      : props.theme.color.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2px;
  font-size: 2vw;
  @media screen and (min-width: ${({ theme }) => theme.window.tabletMin}) {
    font-size: ${({ theme }) => theme.fonts.fontSize.xs};
  }
`;
