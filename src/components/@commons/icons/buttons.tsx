import React from 'react';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { IoIosClose } from '@react-icons/all-files/io/IoIosClose';
import { IoIosCloseCircleOutline } from '@react-icons/all-files/io/IoIosCloseCircleOutline';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';
import { IoIosAddCircleOutline } from '@react-icons/all-files/io/IoIosAddCircleOutline';

import { myTheme } from 'styles/myTheme';

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: string;
  color?: string;
}

const defaultSize: string = '24px';
const defaultColor: string = myTheme.color.textColor;

export const BackArrowButton = ({ onClick, size, color }: Props) => {
  <button onClick={onClick} aria-label="뒤로가기">
    <IoIosArrowBack size={size ? size : defaultSize} color={color ? color : defaultColor} />
  </button>;
};

export const AddButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={onClick} aria-label="추가">
      <IoIosAddCircleOutline size={size ? size : defaultSize} color={color ? color : defaultColor} />
    </button>
  );
};

export const CloseCircleButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={onClick} aria-label="제거">
      <IoIosCloseCircleOutline size={size ? size : defaultSize} color={color ? color : defaultColor} />
    </button>
  );
};

export const CloseButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={onClick} aria-label="닫기">
      <IoIosClose size={size ? size : defaultSize} color={color ? color : defaultColor} />
    </button>
  );
};

export const NextButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={onClick} aria-label="다음">
      <IoIosArrowForward size={size ? size : defaultSize} color={color ? color : defaultColor} />
    </button>
  );
};

export const PrevButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={onClick} aria-label="이전">
      <IoIosArrowBack size={size ? size : defaultSize} color={color ? color : defaultColor} />
    </button>
  );
};
