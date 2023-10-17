import React from 'react';
import styled from 'styled-components';

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
  background-color: #ffffff;
  height: 100%;
  width: 75%;
  padding: 2rem;
  max-width: 25rem;

  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: start;

  gap: 2rem;
  z-index: 981;
`;
