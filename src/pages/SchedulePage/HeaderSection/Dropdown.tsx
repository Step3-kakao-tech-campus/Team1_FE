import React, { useState } from 'react';
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

const DropUp = () => {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.19206 0.230466L8.90654 4.68785C9.34076 5.20891 8.97024 6 8.29197 6L1.70803 6C1.02976 6 0.659237 5.20892 1.09346 4.68785L4.80794 0.230466C4.90789 0.110528 5.09211 0.110528 5.19206 0.230466Z"
        fill="#222222"
      />
    </svg>
  );
};

const DropDown = () => {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.80794 5.76953L1.09346 1.31215C0.659238 0.791085 1.02976 -4.31825e-07 1.70803 -4.02177e-07L8.29197 -1.14384e-07C8.97024 -8.47357e-08 9.34076 0.791085 8.90654 1.31215L5.19206 5.76953C5.09211 5.88947 4.90789 5.88947 4.80794 5.76953Z"
        fill="#222222"
      />
    </svg>
  );
};
