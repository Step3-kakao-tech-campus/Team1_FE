import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

interface Props {
  members?: MemberType[];
}

interface MemberType {
  memberId: number;
  name: string;
}

const Dropdown = ({ members }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const handleOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const itemOnClick = (member: MemberType) => {
    setSelected((prev) => member.name);
    setIsOpen((prev) => false);
  };

  return (
    <div>
      <div className="flex justify-between items-center align-middle" onClick={handleOnClick}>
        <span>{selected ? selected : '선택'}</span>
        <span>{isOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}</span>
      </div>
      {members &&
        members.map((member, index) => (
          <ol onClick={() => itemOnClick(member)} key={member.name}>
            {member.name}
          </ol>
        ))}
    </div>
  );
};

export default Dropdown;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;
