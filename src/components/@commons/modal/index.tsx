import React from 'react';
import styled from 'styled-components';

export const Background = styled.div`
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

export const Box = styled.div`
  background-color: #ffffff;
  min-width: 250px;
  width: 85%;
  max-width: 500px;
  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 16pt;

  gap: 30px;
`;
