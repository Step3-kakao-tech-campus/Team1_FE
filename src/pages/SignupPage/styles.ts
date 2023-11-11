import styled from 'styled-components';

export const UserNameInput = styled.input`
  background: ${({ theme }) => theme.color.backgroundColor};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 10px 12px;
  border: 1px solid;
`;

export const UserTypeButton = styled.button<{ color?: string; $isSelected: boolean }>`
  width: 100%;
  padding: 50px 10px;

  background: ${(props) => (props.$isSelected ? props.theme.color.yellow : props.theme.color.lightBlue)};
  border: 1px solid #000000;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
