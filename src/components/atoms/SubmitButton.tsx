import React from 'react';

type Props = {
  className?: string;
  children: any;
  disabled?: boolean;
  onClick: () => void;
};

const SubmitButton = ({ className, children, disabled, onClick }: Props) => {
  return (
    <button className={className} disabled={disabled} onClick={() => onClick()}>
      {children}
    </button>
  );
};

export default SubmitButton;
