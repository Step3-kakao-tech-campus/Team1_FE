import styled from 'styled-components';

export const ButtonContainer = styled.div`
  position: absolute;
  top: 0%;
  right: 0%;
`;

export const InputTitle = styled.input`
  background-color: transparent;
  margin: auto;
  width: 180px;
  font-size: ${({ theme }) => theme.fonts.fontSize.xl};
  font-weight: ${({ theme }) => theme.fonts.fontWeight.semiBold};
  text-align: center;
  border-bottom: 1px solid white;
  &::placeholder {
    font-size: ${({ theme }) => theme.fonts.fontSize.base};
    font-weight: ${({ theme }) => theme.fonts.fontWeight.regular};
  }
`;

export const InputTime = styled.input`
  background-color: transparent;
`;

export const InputPeople = styled.input`
  margin-left: auto;
  width: 4rem;
  background-color: transparent;
  font-size: ${({ theme }) => theme.fonts.fontSize.xl};
`;
