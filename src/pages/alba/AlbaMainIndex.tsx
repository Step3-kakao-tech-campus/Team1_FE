import React from 'react';
import SchedulePage from 'pages/SchedulePage';
import PageContainer from 'components/@commons/PageContainer';
import GrayBox from 'components/@commons/GrayBox';
import Text from 'components/@commons/Text';
import FlexContainer from 'components/@commons/FlexContainer';
import useGetMyInfo from 'hooks/useGetMyInfo';

const AlbaMainIndex = (): JSX.Element => {
  const { userType } = useGetMyInfo();

  switch (userType) {
    case 'ALBA_NO_GROUP':
      return <AlbaNoGroupPage />;
    case 'ALBA':
      return <SchedulePage />;
    default:
      return <></>;
  }
};

export default AlbaMainIndex;

export const AlbaNoGroupPage = (): JSX.Element => {
  return (
    <PageContainer withoutBottonBar>
      <GrayBox>
        <FlexContainer $wFull $gap="48px">
          <FlexContainer $gap="20px" $padding="0 0 20px 0">
            <Text size="80px" weight="bold" color="red">
              !
            </Text>
            <Text size="xxl">아직 가입한 그룹이 없습니다</Text>
            <Text>매니저에게 초대링크를 요청하세요</Text>
          </FlexContainer>
        </FlexContainer>
      </GrayBox>
    </PageContainer>
  );
};
