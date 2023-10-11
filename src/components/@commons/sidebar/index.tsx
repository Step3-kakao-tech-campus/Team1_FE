import React from 'react';
import styled from 'styled-components';

export const SidebarBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export const SidebarBox = styled.div`
  background-color: #ffffff;
  height: 100%;
  width: 75%;
  padding: 15px;
  transition: 0.4s ease-in-out;

  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: start;

  gap: 30px;
`;
