import { UserData } from 'apis/types';
import { useAtom } from 'jotai';
import { memberAtom } from 'pages/SchedulePage/states';
import { useEffect, useState } from 'react';
import { loginDatahandlers } from 'utils/loginDatahandlers';

export const useSelectMember = () => {
  const [member, setMember] = useAtom(memberAtom);

  const [isOpen, setIsOpen] = useState(false);

  const dropdownOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const contentOnClick = (m: UserData) => {
    setMember({ userId: m.userId, name: m.name, isSelected: true });
    setIsOpen(false);
  };

  const isAdmin = loginDatahandlers.getLoginData().isAdmin;
  useEffect(() => {
    if (isAdmin) {
      setMember((prev) => ({ ...prev, isSelected: false }));
    }
    return;
  }, [isAdmin]);

  return { member, isOpen, dropdownOnClick, contentOnClick };
};
