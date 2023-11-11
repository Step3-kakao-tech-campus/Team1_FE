import { UserData } from 'apis/types';
import { useAtom } from 'jotai';
import { memberAtom } from 'pages/SchedulePage/states';
import { useState } from 'react';

export const useSelectMember = () => {
  const [member, setMember] = useAtom(memberAtom);

  const [isOpen, setIsOpen] = useState(false);

  const dropdownOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const contentOnClick = (m: UserData) => {
    setMember({ userId: m.userId, name: m.name });
    setIsOpen(false);
  };

  return { member, isOpen, dropdownOnClick, contentOnClick };
};
