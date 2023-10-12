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
    setMember((prev) => m);
    setIsOpen((prev) => false);
  };

  return (
    <Whole>
      <Container>
        <TitleCont onClick={dropdownOnClick}>
          <Text>{member.name !== '' ? member.name : '선택'}</Text>
          <Text>{isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}</Text>
        </TitleCont>
        {isOpen && (
          <ContentCont>
            {members?.map((member: T) => (
              <ol onClick={() => contentOnClick(member)} key={member.name}>
                <Text>{member.name}</Text>
              </ol>
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
  justify-content: space-between;
  padding: 4px 0;
`;

const ContentCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: space-between;
  padding: 8px 0;
`;

const Container = styled.div`
  position: absolute;
  top: 0%;

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
