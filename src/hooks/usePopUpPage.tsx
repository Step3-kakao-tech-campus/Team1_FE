import { atom, useSetAtom } from 'jotai';
import React from 'react';

export const popUpAtom = atom<{
  isOn: boolean;
  content: React.ReactNode;
}>({
  isOn: false,
  content: <></>,
});

const usePopUpPage = () => {
  const setPopup = useSetAtom(popUpAtom);

  const popUpOnHandler = (content: React.ReactNode) => {
    setPopup({ isOn: true, content: content });
  };

  const popUpOffHandler = () => {
    setPopup({
      isOn: false,
      content: <></>,
    });
  };

  return { popUpOnHandler, popUpOffHandler };
};

export default usePopUpPage;
