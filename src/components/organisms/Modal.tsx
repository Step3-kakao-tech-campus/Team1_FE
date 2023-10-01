import CloseButton from 'components/atoms/CloseButton';
import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  contents: any;
};

const Modal = ({ contents }: Props) => {
  // (테스트용) 모달 state...
  const [isOpen, setIsOpen] = useState(false);

  // 모달창 외부
  const ModalWrapper = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    top: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
    justify-content: center;
    align-items: center;
  `;
  const ModalFrame = styled.div`
    display: flex;
    background-color: white;
    border-radius: 15px;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
    width: 75%;
    padding: 1rem;
  `;
  const ModalBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
  `;

  const handleDelete = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>모달</button>
      {isOpen && (
        <ModalWrapper>
          <ModalFrame>
            <ModalBody>
              <div>
                <CloseButton
                  onClick={() => {
                    handleDelete();
                  }}
                  size="25"
                  color="gray"
                />
              </div>
              <div>{contents}</div>
            </ModalBody>
          </ModalFrame>
        </ModalWrapper>
      )}
    </>
  );
};

export default Modal;
