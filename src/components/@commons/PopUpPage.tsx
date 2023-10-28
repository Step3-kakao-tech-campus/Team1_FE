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
  flex-grow: 1;
  position: relative;

  gap: ${(props) => (props.$gap ? props.$gap : '20px')};
  padding: ${(props) => (props.$padding ? props.$padding : '28px')};

  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$justify ? props.$justify : 'center')};
  align-items: center;

  padding-bottom: ${(props) => (props.$bottom ? '80px' : '')};
  z-index: 993;
`;

const AlarmBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color.backgroundColor};
  z-index: 991;
`;
