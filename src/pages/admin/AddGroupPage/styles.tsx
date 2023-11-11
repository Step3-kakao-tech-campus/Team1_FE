import styled from 'styled-components';
import React from 'react';
import { CheckIcon } from 'components/@commons/icons';

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

export const Check = () => {
  return (
    <Box>
      <CheckIcon />
    </Box>
  );
};

const Box = styled.div`
  position: relative;
  right: 0;
  width: 32px;
  padding: 4px;
`;
