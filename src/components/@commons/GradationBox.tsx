import React from 'react';
import styled from 'styled-components';

// type Props = {
//   margin: number;
//   children: any;
// };

// const GradationBoxNo = ({ margin, children }: Props) => {
//   return <div className="rounded-lg bg-white p-5 shadow-md">{children}</div>;
// };

const GradationBox = styled.div<{ width?: string }>`
  background: ${({ theme }) => theme.color.backgroundColor};
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
  width: ${(props) => (props.width ? props.width : '')};
`;

export default GradationBox;
