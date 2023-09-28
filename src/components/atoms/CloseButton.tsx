import React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

type Props = {
  onClick: () => void;
  size: string;
  color: string;
};

const CloseButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={() => onClick}>
      <IoIosCloseCircleOutline size={size} color={color} />
    </button>
  );
};

export default CloseButton;
