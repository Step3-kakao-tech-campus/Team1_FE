import { useQuery } from '@tanstack/react-query';
import { getInviteKey } from 'apis/admin/manageGroup';

import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import useModal from 'hooks/useModal';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

const GetInviteKey = (): JSX.Element => {
  const { data: inviteKeyData } = useQuery(['inviteKey'], getInviteKey);
  const { modalOffHandler } = useModal();
  return (
    <FlexContainer $wFull $padding="20px" $gap="30px">
      <FlexContainer $gap="10px">
        <Text size="xl" weight="bold">
          초대 링크
        </Text>
        <Text>아래 링크에 접속하면 그룹에 가입됩니다.</Text>
      </FlexContainer>
      <Box>
        <Text>{inviteKeyData?.data.invitationKey}</Text>
      </Box>
      <FlexContainer $gap="10px">
        <CopyToClipboard text={inviteKeyData?.data.invitationKey as string}>
          <SubmitButton>복사하기</SubmitButton>
        </CopyToClipboard>
        <Button onClick={() => modalOffHandler()}>닫기</Button>
      </FlexContainer>
    </FlexContainer>
  );
};

export default GetInviteKey;

const Box = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.color.gray};
`;

const Button = styled(SubmitButton)`
  background-color: ${({ theme }) => theme.color.backgroundColor};
  border: 2px solid;
  border-color: ${({ theme }) => theme.color.yellow};
`;
