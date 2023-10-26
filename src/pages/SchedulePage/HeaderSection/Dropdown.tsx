import React, { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import { useAtom } from 'jotai';
import { DropDownCont } from 'components/PageStyledComponents/admin/MainPage';
import { memberAtom } from 'pages/SchedulePage/states';
import { UserData } from 'apis/types';

const Dropdown = ({ members }: { members: UserData[] }): JSX.Element => {
  const [member, setMember] = useAtom(memberAtom);

  const [isOpen, setIsOpen] = useState(false);

  const dropdownOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const contentOnClick = (m: UserData) => {
    setMember({ memberId: m.memberId, name: m.name, isSelected: true });
    setIsOpen(false);
  };

  return (
    <DropDownCont>
      <FlexContainer onClick={dropdownOnClick} $wFull $direction="row" $justify="space-between" $padding="4px 0">
        <Text margin="0">{member.name || '선택'}</Text>
        <Text margin="0">{isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}</Text>
      </FlexContainer>
      {isOpen && (
        <FlexContainer $wFull $gap="10px" $padding="16px 0">
          {members.map((member: UserData) => (
            <FlexContainer $wFull $align="flex-start" onClick={() => contentOnClick(member)} key={member.name}>
              <Text margin="0">{member.name}</Text>
            </FlexContainer>
          ))}
        </FlexContainer>
      )}
    </DropDownCont>
  );
};

export default Dropdown;
