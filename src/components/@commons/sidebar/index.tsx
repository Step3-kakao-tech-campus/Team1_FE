import React from 'react';
import styled from 'styled-components';

// SidebarBackgound는 Modal과 똑같은 백그라운드 사용했습니다.
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
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: start;

  gap: 1rem;
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: start;
`;
