import React from 'react';

import { myTheme } from 'styles/myTheme';

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: string;
  color?: string;
}

const defaultSize: string = '24px';
const defaultColor: string = myTheme.color.textColor;

export const BackButton = ({ onClick, size, color }: Props) => {
  <button onClick={onClick} style={{ width: size ? size : defaultSize, color: color ? color : defaultColor }}>
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 12L3.29289 11.2929L2.58579 12L3.29289 12.7071L4 12ZM19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11V13ZM9.29289 5.29289L3.29289 11.2929L4.70711 12.7071L10.7071 6.70711L9.29289 5.29289ZM3.29289 12.7071L9.29289 18.7071L10.7071 17.2929L4.70711 11.2929L3.29289 12.7071ZM4 13H19V11H4V13Z"
        fill="#33363F"
      />
    </svg>
  </button>;
};

export const AddButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={onClick} style={{ width: size ? size : defaultSize, color: color ? color : defaultColor }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6L12 18" stroke="#33363F" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
        <path d="M18 12L6 12" stroke="#33363F" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export const CloseButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={onClick} style={{ width: size ? size : defaultSize, color: color ? color : defaultColor }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="#33363F" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
        <path d="M6 6L18 18" stroke="#33363F" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export const NextButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={onClick} style={{ width: size ? size : defaultSize, color: color ? color : defaultColor }}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 6L15 12L9 18" stroke="#33363F" strokeWidth="2" />
      </svg>
    </button>
  );
};

export const PrevButton = ({ onClick, size, color }: Props) => {
  return (
    <button onClick={onClick} style={{ width: size ? size : defaultSize, color: color ? color : defaultColor }}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 6L9 12L15 18" stroke="#33363F" strokeWidth="2" />
      </svg>
    </button>
  );
};
