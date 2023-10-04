import { styled } from 'styled-components';
import React from 'react';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { myTheme } from 'styles/myTheme';

interface Props {
  onClick?: () => void;
  size?: string;
  color?: string;
}

const defaultSize: string = '24px';
const defaultColor: string = myTheme.color.textColor;

export const BackButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={onClick}>
      <IoMdArrowRoundBack size={size ? size : defaultSize} color={color ? color : defaultColor} />
    </button>
  );
};

export const CloseButton = ({ onClick, size, color }: Props) => {
  return (
    <div onClick={onClick}>
      <IoIosCloseCircleOutline size={size ? size : defaultSize} color={color ? color : defaultColor} />
    </div>
  );
};

export const NextButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={onClick}>
      <IoIosArrowForward size={size ? size : defaultSize} color={color ? color : defaultColor} />
    </button>
  );
};

export const PrevButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={onClick}>
      <IoIosArrowBack size={size ? size : defaultSize} color={color ? color : defaultColor} />
    </button>
  );
};
