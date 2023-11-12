import styled from 'styled-components';
export const Box = styled.div`
  z-index: 90;
  bottom: 0;

  background: ${({ theme }) => theme.color.lightGray};

  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${({ theme }) => theme.window.tabletMax}) {
    position: sticky;

    width: 100%;
    height: 70px;
    padding: 6px 0px 18px;
    border-radius: 25px 25px 0px 0px;

    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
  }

  @media screen and (min-width: ${({ theme }) => theme.window.desktopMin}) {
    position: fixed;
    left: 0;

    width: 70px;
    height: unset;
    padding: 40px 0;
    border-radius: 15px;

    flex-direction: column;
    align-items: center;
    gap: 60px;
  }
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
