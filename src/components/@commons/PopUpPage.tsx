import React from 'react';
import styled from 'styled-components';

const PopUpPage = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <AlarmBackground>
      <AlarmContainer>{children}</AlarmContainer>
    </AlarmBackground>
  );
};

export default PopUpPage;

const AlarmContainer = styled.main<{
  $gap?: string;
  $padding?: string;
  $justify?: string;
  $bottom?: boolean;
}>`
  width: 100%;
  flex-grow: 1;
  position: relative;

  max-width: ${({ theme }) => theme.window.tabletMax};
  min-width: ${({ theme }) => theme.window.minWidth};
  @media screen and (min-width: ${({ theme }) => theme.window.desktopMin}) {
    max-width: 480px;
  }
  padding: 24px 20px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  z-index: 993;
`;

const AlarmBackground = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;

  background: ${({ theme }) => theme.color.backgroundColor};
  z-index: 991;
`;
