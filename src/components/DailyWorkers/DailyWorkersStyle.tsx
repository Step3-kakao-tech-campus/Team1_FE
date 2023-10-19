import FlexContainer from 'components/@commons/FlexContainer';
import styled from 'styled-components';

export const TitleBox = styled(FlexContainer)<{ $time?: string }>`
  width: 100%;
  background-color: ${(props) =>
    props.$time &&
    (props.$time === '오픈'
      ? props.theme.color.open
      : props.$time === '미들'
      ? props.theme.color.middle
      : props.theme.color.close)};
  align-items: center;
  gap: 0;
  padding: 4px;
`;

export const NameBox = styled.div`
  background-color: ${({ theme }) => theme.color.lightGray};
  text-align: center;
`;
