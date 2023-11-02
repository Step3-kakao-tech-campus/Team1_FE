import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import React from 'react';
import { saveLoginData } from 'utils/loginDatahandlers';

export const useLoginState = () => {
  const navigate = useNavigate();
  const afterLogin = (
    token: string,
    userData: {
      isAdmin: boolean;
    },
  ) => {
    saveLoginData(token, userData);
    navigate(convertPath(sessionStorage.getItem('beforeLoginURL') || '/'));
  };

  return { afterLogin };
};
