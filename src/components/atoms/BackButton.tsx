import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';

type Props = {
  onClick: () => void;
  size: string;
  color: string;
};

const BackButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={() => onClick()}>
      <IoMdArrowRoundBack size={size} color={color} />
    </button>
  );
};

export default BackButton;
