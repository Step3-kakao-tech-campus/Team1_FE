import ProfileImage from 'components/atoms/ProfileImage';
import Dropdown from 'components/organisms/Dropdown';
import Modal from 'components/organisms/Modal';
import React from 'react';

type Props = {};

const TestPage = (props: Props) => {
  return (
    <div>
      <Dropdown members={['라이언', '춘식이']} />
      <Modal contents={'안녕하세요'} />
      <ProfileImage />
    </div>
  );
};

export default TestPage;
