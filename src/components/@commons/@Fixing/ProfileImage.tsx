import React from 'react';
import { HiUserCircle } from 'react-icons/hi';

/* 세부 기능에서 사용 */
type Props = {
  size?: string;
  color?: string;
};

const ProfileImage = ({ size, color }: Props) => {
  return <HiUserCircle size={size ? size : '30px'} color={color ? color : '#828282'} />;
};

export default ProfileImage;
