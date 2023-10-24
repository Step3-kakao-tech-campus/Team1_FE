import styled from 'styled-components';
import React from 'react';

export const InputBox = styled.input`
  width: 100%;
  height: 36px;
  padding: 8px;
`;

export const InputLabel = styled.label`
  width: 128px;
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.fontSize.sm};
`;

export const CheckIcon = () => {
  return (
    <Box>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6"
          stroke="#33363F"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );
};

const Box = styled.div`
  position: relative;
  right: 0;
  width: 32px;
  padding: 4px;
`;
