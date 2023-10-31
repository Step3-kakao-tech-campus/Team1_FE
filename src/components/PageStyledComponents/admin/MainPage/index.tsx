import styled from 'styled-components';

export const DropDownCont = styled.div`
  position: absolute;
  top: 20%;

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2px 16px;
  background-color: ${({ theme }) => theme.color.lightGray};
  z-index: 20;
`;
