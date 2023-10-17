import GrayBox from 'components/@commons/GrayBox';
import Text from 'components/@commons/Text';
import React from 'react';

const NotFixedDateBox = (): JSX.Element => {
  return (
    <GrayBox>
      <Text size="lg" weight="medium">
        아직 확정된 스케줄이 없습니다
      </Text>
    </GrayBox>
  );
};

export default NotFixedDateBox;
