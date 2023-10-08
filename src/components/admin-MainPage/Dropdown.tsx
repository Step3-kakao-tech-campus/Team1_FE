import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

interface Props<T> {
  members: T[];
  selected: T | null;
  setSelected: React.Dispatch<React.SetStateAction<T | null>>;
}

interface MemberType {
  name: string;
}

const Dropdown = <T extends MemberType>({ members, selected, setSelected }: Props<T>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const itemOnClick = (member: T) => {
    setSelected((prev) => member);
    setIsOpen((prev) => false);
  };

  return (
    <div>
      <div className="flex justify-between items-center align-middle" onClick={handleOnClick}>
        <span>{!!selected ? selected.name : '선택'}</span>
        <span>{isOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}</span>
      </div>
      {isOpen && (
        <Contents>
          {members &&
            members.map((member: T) => (
              <ol onClick={() => itemOnClick(member)} key={member.name}>
                {member.name}
              </ol>
            ))}
        </Contents>
      )}
    </div>
  );
};

export default Dropdown;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;
