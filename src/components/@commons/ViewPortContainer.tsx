import { modalAtom } from 'hooks/useModal';
import { useAtomValue } from 'jotai';
import React from 'react';
import styled from 'styled-components';
import { Modal } from '../modals';
// import { popUpAtom } from 'hooks/usePopUpPage';
// import PopUpPage from './PopUpPage';

const ViewPortContainer = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const modal = useAtomValue(modalAtom);
  // const popUp = useAtomValue(popUpAtom);

  return (
    <WholeConatiner>
      <ColumnContainer>
        {modal.isOn && <Modal>{modal.content}</Modal>}
        {/* {popUp.isOn && <PopUpPage>{popUp.content}</PopUpPage>} */}
        {children}
      </ColumnContainer>
    </WholeConatiner>
  );
};

export default ViewPortContainer;

const WholeConatiner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const ColumnContainer = styled.div`
  position: relative;

  width: 100%;

  max-width: ${({ theme }) => theme.window.tabletMax};
  min-width: ${({ theme }) => theme.window.minWidth};

  @media screen and (min-width: ${({ theme }) => theme.window.desktopMin}) {
    max-width: 480px;
  }
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`;
