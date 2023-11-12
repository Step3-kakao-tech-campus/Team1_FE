import styled from 'styled-components';

export const LinkBox = styled.input`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.color.gray};
  overflow-x: scroll;
  text-align: center;
  height: 100%;
`;
