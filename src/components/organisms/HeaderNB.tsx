import React from 'react';
import instance from 'apis/instance';
import { useNavigate } from 'react-router-dom';

type Props = {};

const HeaderNB = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="sm: flex align-middle">
      <img src="/images/albba_5pt.png" width={100} onClick={() => navigate('/')} />
      <img src="/images/alarm.png" width={40} onClick={() => navigate('/notification')} />
    </div>
  );
};

export default HeaderNB;
