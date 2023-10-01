import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

type Props = {
  className?: string;
  children?: string;
  members: string[];
};

const Dropdown = ({ className, children, members }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSelected, setIsSelected] = useState(false);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  const Contents = styled.div`
    display: flex;
    flex-direction: column;
  `;

  return (
    <div className={className}>
      <div className="flex justify-between items-center align-middle" onClick={handleOnClick}>
        <span>{isSelected ? isSelected : '선택'}</span>
        <span>{isOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}</span>
      </div>
      {isOpen && (
        // open
        <Contents>{members && members.map((member, index) => <ol key={index}>{member}</ol>)}</Contents>
      )}
    </div>
  );
};

export default Dropdown;
