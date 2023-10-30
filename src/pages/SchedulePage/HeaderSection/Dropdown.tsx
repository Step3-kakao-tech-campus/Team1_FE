import React, { useState } from 'react';
import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import { useAtom } from 'jotai';
import { DropDownCont } from 'components/PageStyledComponents/admin/MainPage';
import { memberAtom } from 'pages/SchedulePage/states';
import { UserData } from 'apis/types';
import { DropDown, DropUp } from 'components/@commons/icons';

const Dropdown = ({ members }: { members: UserData[] }): JSX.Element => {
  const [member, setMember] = useAtom(memberAtom);

  const [isOpen, setIsOpen] = useState(false);

  const dropdownOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const contentOnClick = (m: UserData) => {
    setMember({ userId: m.userId, name: m.name, isSelected: true });
    setIsOpen(false);
  };

  return (
    <DropDownCont>
      <FlexContainer
        onClick={dropdownOnClick}
        $wFull
        $direction="row"
        $justify="space-between"
        $align="center"
        $padding="4px 0"
      >
        <Text margin="0">{member.name || '선택'}</Text>
        {isOpen ? <DropUp /> : <DropDown />}
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
