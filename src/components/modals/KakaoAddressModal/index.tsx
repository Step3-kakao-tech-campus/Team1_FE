import SubmitButton from 'components/@commons/SubmitButton';
import useModal from 'hooks/useModal';
import React from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';

interface Props {
  onComplete: (address: Address) => void;
}

const KakaoAddressModal = ({ onComplete }: Props): JSX.Element => {
  const { modalOffHandler } = useModal();
  return (
    <>
      <DaumPostcodeEmbed onComplete={onComplete} autoClose />
      <SubmitButton onClick={modalOffHandler}>닫기</SubmitButton>
    </>
  );
};

export default KakaoAddressModal;
