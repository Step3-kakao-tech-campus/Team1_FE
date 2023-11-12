import LoginOrSignup from 'components/LoginSignUpButton/LoginOrSignup';
import useModal from 'hooks/useModal';
import React from 'react';

interface Props {
  invitationKey: string;
}

const LoginSignupModal = ({ invitationKey }: Props): JSX.Element => {
  const { modalOffHandler } = useModal();
  return (
    <>
      <LoginOrSignup redirectPage={'/invited/' + invitationKey} />
      <button onClick={modalOffHandler}>닫기</button>
    </>
  );
};

export default LoginSignupModal;
