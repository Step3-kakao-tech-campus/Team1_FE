import React from 'react';
import { IoMdCheckmark } from '@react-icons/all-files/io/IoMdCheckmark';
import { IoMdArrowDropup } from '@react-icons/all-files/io/IoMdArrowDropup';
import { IoMdArrowDropdown } from '@react-icons/all-files/io/IoMdArrowDropdown';
import { IoMdMenu } from '@react-icons/all-files/io/IoMdMenu';
import { myTheme } from 'styles/myTheme';

const defaultSize: string = '24px';
const defaultColor: string = myTheme.color.textColor;

interface IconProps {
  size?: string;
  color?: string;
}
export const CheckIcon = ({ size, color }: IconProps) => {
  return <IoMdCheckmark size={size ? size : defaultSize} color={color ? color : defaultColor} />;
};

export const DropUp = ({ size, color }: IconProps) => {
  return <IoMdArrowDropup size={size ? size : defaultSize} color={color ? color : defaultColor} />;
};

export const DropDown = ({ size, color }: IconProps) => {
  return <IoMdArrowDropdown size={size ? size : defaultSize} color={color ? color : defaultColor} />;
};

export const Hamburger = ({ size, color }: IconProps) => {
  return <IoMdMenu size={size ? size : defaultSize} color={color ? color : defaultColor} />;
};
