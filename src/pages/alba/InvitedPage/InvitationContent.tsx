import { useQuery } from '@tanstack/react-query';
import { getGroupInfo } from 'apis/alba/joinGroup';
import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import React from 'react';

interface Props {
  invitationKey: string;
}

const InvitationContent = ({ invitationKey }: Props): JSX.Element => {
  // 초대링크 페이지 접속 시
  const { data: marketData } = useQuery(
    ['invitation', invitationKey],
    () => getGroupInfo({ invitationKey: invitationKey }),
    {
      suspense: true,
    },
  );
  return (
    <FlexContainer>
      <FlexContainer>
        <Text size="xxxl" weight="bold">
          {marketData?.data.groupName}
        </Text>
      </FlexContainer>
      <FlexContainer $wFull>
        <Text>그룹에 초대되었습니다.</Text>
      </FlexContainer>
    </FlexContainer>
  );
};

export default InvitationContent;
