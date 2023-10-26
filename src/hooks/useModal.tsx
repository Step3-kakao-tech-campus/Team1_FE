import { Modal } from 'components/@commons/modal';
import React, { useCallback, useState } from 'react';

const useModal = () => {
  const [isOn, setIsOn] = useState(false);
  const modalOnHandler = useCallback(() => {
    setIsOn((prev) => true);
  }, [isOn]);

  const modalOffHandler = useCallback(() => {
    setIsOn((prev) => false);
  }, [isOn]);

  const ModalComponent = ({ children }: { children: React.ReactNode }) => {
    return <>{isOn && <Modal>{children}</Modal>}</>;
  };

  return { isOn, modalOnHandler, modalOffHandler, ModalComponent };
};

export default useModal;
