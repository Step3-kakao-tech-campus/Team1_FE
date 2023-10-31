import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from 'apis/userInfo';
import { getLoginData } from 'utils/loginDatahandlers';

const useGetMyInfo = () => {
  const isLogin = getLoginData().isLogin;
  const { data: myInfo } = useQuery(['myInfo'], getMyInfo, { suspense: true, cacheTime: 0, enabled: isLogin });

  const userName = myInfo?.data.userName;
  const groupName = myInfo?.data.groupName;
  const members = myInfo?.data.members || [];

  return {
    hasGroup: groupName !== null,
    hasMember: members.length > 1,
    groupName: groupName,
    userName: userName,
    members: members,
  };
};

export default useGetMyInfo;
