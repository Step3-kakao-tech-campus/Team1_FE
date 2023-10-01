import React from 'react';

type Props = {
  className: string;
  name: string;
  type: string;
  placeholder: string;
};

const InputBox = ({ className, name, type, placeholder }: Props) => {
  return <input className={className} name={name} type={type} placeholder={placeholder} />;
};

export default InputBox;
