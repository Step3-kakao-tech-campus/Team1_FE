import React from 'react';

type Props = {
  className: string;
  children: string;
  activity: boolean;
  handleClick: () => void;
};

const Button = ({ className, children, activity, handleClick }: Props) => {
  return (
    <button className={className} disabled={!activity} onClick={() => handleClick()}>
      {children}
    </button>
  );
};

export default Button;
