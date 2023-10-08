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

/* 미완성입니다 */
const Dropdown = ({ members }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [Selected, setSelected] = useState<string | null>(null);

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
        <span>{Selected !== null ? Selected : '선택'}</span>
        <span>{isOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}</span>
      </div>
      {isOpen && (
        <Contents>
          {members &&
            members.map((member, index) => (
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
