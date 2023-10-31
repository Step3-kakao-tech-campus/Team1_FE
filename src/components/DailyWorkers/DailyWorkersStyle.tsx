import FlexContainer from 'components/@commons/FlexContainer';
import styled from 'styled-components';
import { timeColors } from 'utils/colors';

export const TitleBox = styled(FlexContainer)<{ $time: string; $timeIndex: number }>`
  width: 100%;
  background-color: ${(props) => props.$time && timeColors(props.$timeIndex)};
  align-items: center;
  gap: 0;
  padding: 4px;
`;

export const NameBox = styled.div`
  background-color: ${({ theme }) => theme.color.lightGray};
  text-align: center;
`;
