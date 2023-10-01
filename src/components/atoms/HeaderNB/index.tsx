import { styled } from 'styled-components';

export const HeaderNBLeftMenuGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderNBRightMenuGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const HeaderNBInnerBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 7px;
`;

export const HeaderNBContainer = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 5px rgb(199, 199, 199);
  background-color: white;
`;

export const HeaderNBButton = styled.button`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin: 0 10px;
  cursor: pointer;
`;

export const Logobox = styled.div`
  margin: 0 10px;
  width: 30px;
  height: 30px;
  background-image: url('https://blog.kakaocdn.net/dn/daL0ub/btsmROiKTyk/t2CmD7jf13LjIkJ3vrLjcK/tfile.svg');
  background-size: contain;
  background-repeat: no-repeat;
`;
