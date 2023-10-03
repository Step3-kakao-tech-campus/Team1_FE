import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

interface Props {
  className?: string;
  members?: MemberType[];
}

interface MemberType {
  memberId: number;
  name: string;
}

/* 미완성입니다 */
const Dropdown = ({ className, members }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [Selected, setSelected] = useState<string | null>(null);

  const handleOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const itemOnClick = (member: MemberType) => {
    setSelected((prev) => member.name);
    setIsOpen((prev) => false);
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center align-middle" onClick={handleOnClick}>
        <span>{Selected !== null ? Selected : '선택'}</span>
        <span>{isOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}</span>
      </div>
      {isOpen && (
        <Contents>
          {members &&
            members.map((member, index) => (
              <ol onClick={() => itemOnClick(member)} key={index}>
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
