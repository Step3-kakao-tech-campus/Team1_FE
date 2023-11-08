import { usePostGroupJoin } from 'hooks/alba/invitation/fetch';
import useModal from 'hooks/useModal';
import usePopUpPage from 'hooks/usePopUpPage';
import React from 'react';
import { loginDatahandlers } from 'utils/loginDatahandlers';

const useInvitation = (invitationKey: string, donePage: React.ReactNode, loginModal: React.ReactNode) => {
  const loginState = loginDatahandlers.getLoginData();
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
