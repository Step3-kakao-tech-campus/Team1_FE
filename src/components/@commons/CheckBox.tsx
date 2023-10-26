import styled from 'styled-components';

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: ${({ theme }) => theme.color.yellow};
`;

export default CheckBox;
