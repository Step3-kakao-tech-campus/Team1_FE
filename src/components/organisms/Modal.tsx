import React from 'react';
import styled from 'styled-components';

interface Props {
  children: JSX.Element;
}

const Modal = ({ children }: Props): JSX.Element => {
  return (
    <Background>
      <Box>
        {children}
        <button>닫기버튼</button>
      </Box>
    </Background>
  );
};

export default Modal;

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
`;
const Box = styled.div`
  background-color: #ffffff;
  min-width: 250px;
  width: 70%;
  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 30px;
`;
