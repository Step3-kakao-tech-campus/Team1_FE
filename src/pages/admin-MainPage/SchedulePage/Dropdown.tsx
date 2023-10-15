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

  const dropdownOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const contentOnClick = (m: T) => {
    setMember((prev) => ({ ...prev, memberId: m.memberId, name: m.name }));
    setIsOpen((prev) => false);
  };

  return (
    <Whole>
      <Container>
        <TitleCont onClick={dropdownOnClick}>
          <Text margin="0">{member.name || '선택'}</Text>
          <Text margin="0">{isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}</Text>
        </TitleCont>
        {isOpen && (
          <ContentCont>
            {members?.map((member: T) => (
              <FlexContainer $wFull onClick={() => contentOnClick(member)} key={member.name}>
                <Text margin="0">{member.name}</Text>
              </FlexContainer>
            ))}
          </ContentCont>
        )}
      </Container>
    </Whole>
  );
};

export default Dropdown;

const TitleCont = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 0;
`;

const ContentCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-between;
  padding: 16px 0;
  gap: 10px;
`;

const Container = styled.div`
  position: absolute;
  top: 20%;

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2px 24px;
  background-color: ${({ theme }) => theme.color.lightGray};
  z-index: 10;
`;

const Whole = styled.div`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  height: 100%;
  min-height: 30px;
  width: 100%;
`;
