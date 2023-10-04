import React from 'react';
import { HiUserCircle } from 'react-icons/hi';

interface Props {
  size?: string;
  color?: string;
}

const ProfileImage = ({ size, color }: Props) => {
  return <HiUserCircle size={size ? size : '30'} color={color ? color : '#828282'} />;
};

export default ProfileImage;
