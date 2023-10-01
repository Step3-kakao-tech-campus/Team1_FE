import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

type Props = {
  onClick: () => void;
  size: string;
  color: string;
};

const NextButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={() => onClick()}>
      <IoIosArrowForward size={size} color={color} />
    </button>
  );
};

export default NextButton;
