import { useQuery } from '@tanstack/react-query';
import { getGroupInfo } from 'apis/groupInvite';
import FlexContainer from 'components/@commons/FlexContainer';
import React from 'react';

interface Props {
  invitationKey: string;
}

const InvitationContent = ({ invitationKey }: Props): JSX.Element => {
  // 초대링크 페이지 접속 시
  const { data: marketData } = useQuery(['invitation', invitationKey], () => getGroupInfo(invitationKey), {
    suspense: true,
  });
  return (
    <FlexContainer>
      <FlexContainer $align="center" $padding="20px">
        <div className="w-20 h-20 rounded-full bg-blue-600">임시 프로필</div>
      </FlexContainer>
      <FlexContainer>
        <span className="text-center font-bold text-3xl">{marketData?.data.groupName}</span>
      </FlexContainer>
      <FlexContainer $wFull={true}>
        <span className="text-center">그룹에 초대되었습니다.</span>
      </FlexContainer>
    </FlexContainer>
  );
};

export default InvitationContent;
