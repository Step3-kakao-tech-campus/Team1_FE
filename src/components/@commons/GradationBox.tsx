import React from 'react';

type Props = {
  margin: number;
  children: any;
};

const GradationBox = ({ margin, children }: Props) => {
  return <div className="rounded-lg bg-white p-5 shadow-md">{children}</div>;
};

export default GradationBox;
