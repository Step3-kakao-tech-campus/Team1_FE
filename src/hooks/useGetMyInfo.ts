import { useQuery } from '@tanstack/react-query';
import { UserData } from 'apis/types';
import { getMyInfo } from 'apis/userInfo';
import { loginDatahandlers } from 'utils/loginDatahandlers';

const useGetMyInfo = () => {
  const { data: myInfo } = useQuery(['myInfo'], () => getMyInfo(), {
    suspense: true,
    refetchOnWindowFocus: false,
  });

  const userName = myInfo?.userName || '';
  const groupName = myInfo?.groupName || null;
  const members = myInfo?.members || [];
  const userType = userTypeCheck(groupName, members);

  return {
    userType,
    groupName: groupName,
    userName: userName,
    members: members,
  };
};

export default useGetMyInfo;

export type UserType = 'NON_USER' | 'ADMIN_NO_GROUP' | 'ADMIN_NO_MEMBER' | 'ADMIN' | 'ALBA_NO_GROUP' | 'ALBA';

const userTypeCheck = (groupName: string | null, members: UserData[]): UserType => {
  const loginState = loginDatahandlers.getLoginData();

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
