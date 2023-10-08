import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import { memberAtom } from './AdminScheduleSection';
import { useAtom } from 'jotai';

interface Props<T> {
  members: T[];
}

interface MemberType {
  memberId: number;
  name: string;
}

const Dropdown = <T extends MemberType>({ members }: Props<T>): JSX.Element => {
  const [member, setMember] = useAtom(memberAtom);

  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const itemOnClick = (m: T) => {
    setMember((prev) => m);
    setIsOpen((prev) => false);
  };

  return (
    <Container>
      <FlexContainer $direction="row" onClick={handleOnClick} $align="center" $justify="space-between">
        <Text>{member.name !== '' ? member.name : '선택'}</Text>
        <Text>{isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}</Text>
      </FlexContainer>
      {isOpen && (
        <FlexContainer $gap="0" $padding="8px 0">
          {members &&
            members.map((member: T) => (
              <ol onClick={() => itemOnClick(member)} key={member.name}>
                <Text>{member.name}</Text>
              </ol>
            ))}
        </FlexContainer>
      )}
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2px 24px;
  background-color: ${({ theme }) => theme.color.lightGray};
`;
