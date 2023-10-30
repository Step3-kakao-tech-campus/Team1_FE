import React from 'react';

import { IoIosClose, IoMdArrowRoundBack } from 'react-icons/io';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosAddCircleOutline } from 'react-icons/io';

import { myTheme } from 'styles/myTheme';

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: string;
  color?: string;
}

const defaultSize: string = '24px';
const defaultColor: string = myTheme.color.textColor;

export const AddButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={onClick}>
      <IoIosAddCircleOutline size={size ? size : defaultSize} color={color ? color : defaultColor} />
    </button>
  );
};

export const CloseButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={onClick}>
      <IoIosClose size={size ? size : defaultSize} color={color ? color : defaultColor} />
    </button>
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
