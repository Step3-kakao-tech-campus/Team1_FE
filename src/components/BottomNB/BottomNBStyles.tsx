import styled from 'styled-components';
export const Box = styled.div`
  position: fixed;
  z-index: 90;
  bottom: 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 6px 0px 18px;
  gap: 10px;

  width: 100%;
  height: 70px;
  max-width: 585px;

  background: ${({ theme }) => theme.color.lightGray};
  border-radius: 25px 25px 0px 0px;
`;

export const MenuBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 2px;
  width: 100%;
`;

export const IconCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
`;

export const TextCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  font-size: ${({ theme }) => theme.fonts.fontSize.sm};
`;
