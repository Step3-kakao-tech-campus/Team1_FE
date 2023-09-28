import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

type Props = {
  onClick: () => void;
  size: string;
  color: string;
};

const PrevButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={() => onClick}>
      <IoIosArrowBack size={size} color={color} />
    </button>
  );
};

export default PrevButton;
