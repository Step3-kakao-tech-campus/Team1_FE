import Text from 'components/@commons/Text';
import React, { Suspense } from 'react';
import EditTimeForm from './EditTimeForm';
import { dateToString } from 'utils/dateToString';
import FlexContainer from 'components/@commons/FlexContainer';
import SetTimeTemplateSkeleton from 'components/Suspenses/PageSkeletons/SetTimeTemplateSkeleton';

const SetTimeTemplateSection = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const [y, m, d] = startWeekDate.split('-').map((e: string) => Number.parseInt(e));
  const endDate = dateToString(new Date(y, m - 1, d + 6));

  return (
    <>
      <Text size="xl">
        {startWeekDate} ~ {endDate}
      </Text>

      <Text>근무 시간대를 설정하세요</Text>
      <FlexContainer $wFull $align="center" $gap="30px">
        {startWeekDate && (
          <Suspense fallback={<SetTimeTemplateSkeleton />}>
            <EditTimeForm startWeekDate={startWeekDate} />
          </Suspense>
        )}
      </FlexContainer>
    </>
  );
};

export default SetTimeTemplateSection;
