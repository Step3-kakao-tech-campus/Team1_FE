import { atom, useSetAtom } from 'jotai';
import React from 'react';

export const modalAtom = atom<{
  isOn: boolean;
  content: React.ReactNode;
}>({
  isOn: false,
  content: <></>,
});

const useModal = () => {
  const setModal = useSetAtom(modalAtom);

  const modalOnHandler = (content: React.ReactNode) => {
    setModal({ isOn: true, content: content });
  };

  const modalOffHandler = () => {
    setModal({
      isOn: false,
      content: <></>,
    });
  };

  return { modalOnHandler, modalOffHandler };
};

export default useModal;
