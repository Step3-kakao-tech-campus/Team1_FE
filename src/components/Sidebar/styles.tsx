import styled from 'styled-components';

export const HorizontalLine = styled.div`
  border-top: 0.8px solid;
  border-color: ${({ theme }) => theme.color.gray};
  width: 100%;
`;

export const SidebarBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 980;
`;

export const SidebarBox = styled.div`
  background-color: ${({ theme }) => theme.color.backgroundColor};
  height: 100%;
  width: 75%;
  max-width: 400px;

  padding: 32px;

  height: 100vh;
  overflow-y: scroll;
`;
