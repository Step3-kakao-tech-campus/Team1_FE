import useModal from 'hooks/useModal';
import React from 'react';
import styled from 'styled-components';

export const Modal = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { modalOffHandler } = useModal();
  return (
    <Background onClick={() => modalOffHandler()}>
      <Box onClick={(e) => e.stopPropagation()}>{children}</Box>
    </Background>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 991;
`;

const Box = styled.div`
  background-color: #ffffff;
  min-width: 250px;
  width: 85%;
  max-width: 500px;
  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 30px;
  z-index: 992;
`;
