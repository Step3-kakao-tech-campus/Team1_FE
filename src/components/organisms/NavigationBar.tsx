import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUserAdd, HiOutlineHome, HiOutlineUserCircle } from 'react-icons/hi';

type Props = {};

const NavigationBar = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div>
      <HiOutlineUserAdd size="50" color="#828282" onClick={() => navigate('/')} />
      <HiOutlineHome size="50" color="#828282" onClick={() => navigate('/')} />
      <HiOutlineUserCircle size="50" color="#828282" onClick={() => navigate('/')} />
    </div>
  );
};

export default NavigationBar;
