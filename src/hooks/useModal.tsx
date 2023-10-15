import { Background, Box } from 'components/@commons/modal';
import React, { useCallback, useState } from 'react';

const useModal = () => {
  const [isOn, setIsOn] = useState(false);
  const modalOnHandler = useCallback(() => {
    setIsOn((prev) => true);
  }, [isOn]);

  const modalOffHandler = useCallback(() => {
    setIsOn((prev) => false);
  }, [isOn]);

  const ModalComponent = ({ children }: ModalProps): JSX.Element => {
    return isOn ? (
      <Background>
        <Box>{children}</Box>
      </Background>
    ) : (
      <></>
    );
  };

  return { isOn, modalOnHandler, modalOffHandler, ModalComponent };
};

export default useModal;

interface ModalProps {
  children: React.ReactNode;
}
