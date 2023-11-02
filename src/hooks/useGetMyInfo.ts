import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from 'apis/userInfo';
import { getLoginData } from 'utils/loginDatahandlers';
import React from 'react';
import { UserData } from 'apis/types';

const useGetMyInfo = () => {
  const { data: myInfo } = useQuery(['myInfo'], getMyInfo, {
    suspense: true,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });

  const userName = myInfo?.data.userName || '';
  const groupName = myInfo?.data.groupName || null;
  const members = myInfo?.data.members || [];
  const userType = userTypeCheck(groupName, members);

  return {
    userType,
    groupName: groupName,
    userName: userName,
    members: members,
  };
};

export default useGetMyInfo;

type UserType = 'NON_USER' | 'ADMIN_NO_GROUP' | 'ADMIN_NO_MEMBER' | 'ADMIN' | 'ALBA_NO_GROUP' | 'ALBA';

const userTypeCheck = (groupName: string | null, members: UserData[]): UserType => {
  const loginState = getLoginData();

  if (!loginState.isLogin) {
    return 'NON_USER';
  }

  if (loginState.isAdmin) {
    if (groupName === null) {
      return 'ADMIN_NO_GROUP';
    }
    if (members.length === 1) {
      return 'ADMIN_NO_MEMBER';
    }
    return 'ADMIN';
  }

  if (!loginState.isAdmin) {
    if (groupName === null) {
      return 'ALBA_NO_GROUP';
    }
    return 'ALBA';
  }

  throw { name: 'userTypeError' };
};
