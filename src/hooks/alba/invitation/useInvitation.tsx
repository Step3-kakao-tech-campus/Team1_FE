import React from 'react';
import useModal from 'hooks/useModal';
import { getLoginData } from 'utils/loginDatahandlers';
import { usePostGroupJoin } from 'hooks/alba/invitation/fetch';
import usePopUpPage from 'hooks/usePopUpPage';

const useInvitation = (invitationKey: string, donePage: React.ReactNode, loginModal: React.ReactNode) => {
  const loginState = getLoginData();
  const { modalOnHandler } = useModal();
  const { popUpOnHandler } = usePopUpPage();

  const { postGroupJoinMutate } = usePostGroupJoin(invitationKey, () => popUpOnHandler(donePage));
  const acceptBtnHandler = (): void => {
    if (!loginState.isLogin) {
      modalOnHandler(loginModal);
      return;
    }
    postGroupJoinMutate();
    return;
  };

  return { acceptBtnHandler };
};
export default useInvitation;
