import React from 'react';

type Props = {
  className?: string;
  children?: any;
  disabled?: boolean;
  onClick?: (e?: React.MouseEventHandler<HTMLButtonElement>) => void;
};

const SubmitButton = ({ className, children, disabled, onClick }: Props) => {
  return (
    <button className={className} disabled={disabled} onClick={(e) => onClick}>
      {children}
    </button>
  );
};

export default SubmitButton;
