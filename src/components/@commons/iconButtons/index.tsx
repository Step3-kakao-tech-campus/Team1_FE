import { styled } from 'styled-components';
import React from 'react';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

type Props = {
  onClick: () => void;
  size: string;
  color: string;
};

export const BackButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={() => onClick()}>
      <IoMdArrowRoundBack size={size} color={color} />
    </button>
  );
};

export const CloseButton = ({ onClick, size, color }: Props) => {
  return (
    <div onClick={() => onClick()}>
      <IoIosCloseCircleOutline size={size} color={color} />
    </div>
  );
};

export const NextButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={() => onClick()}>
      <IoIosArrowForward size={size} color={color} />
    </button>
  );
};

export const PrevButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={() => onClick()}>
      <IoIosArrowBack size={size} color={color} />
    </button>
  );
};
