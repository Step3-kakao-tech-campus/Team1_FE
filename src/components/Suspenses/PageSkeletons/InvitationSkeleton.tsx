import React from 'react';
import DefferedSuspense from '../DefferedSuspense';
import FlexContainer from 'components/@commons/FlexContainer';
import Skeleton from '../Skeleton';
import Text from 'components/@commons/Text';
import SubmitButton from 'components/@commons/SubmitButton';

const InvitationSkeleton = () => {
  return (
    <DefferedSuspense>
      <FlexContainer>
        <Skeleton height="2rem" />
      </FlexContainer>
      <FlexContainer $wFull>
        <Text>그룹에 초대되었습니다.</Text>
      </FlexContainer>

      <SubmitButton disabled>승인하기</SubmitButton>
    </DefferedSuspense>
  );
};

export default InvitationSkeleton;
