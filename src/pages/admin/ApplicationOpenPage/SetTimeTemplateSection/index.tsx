import Text from 'components/@commons/Text';
import React, { Suspense } from 'react';
import SetTimeTemplate from './SetTimeTemplate';
import { dateToString } from 'utils/dateToString';

const SetTimeTemplateSection = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const [y, m, d] = startWeekDate.split('-').map((e: string) => Number.parseInt(e));
  const endDate = dateToString(new Date(y, m, d + 6));

  return (
    <>
      <Text>
        {startWeekDate} ~ {endDate}
      </Text>
      <Text>근무 시간대를 설정하세요</Text>
      {startWeekDate && (
        <Suspense>
          <SetTimeTemplate startWeekDate={startWeekDate} />
        </Suspense>
      )}
    </>
  );
};

export default SetTimeTemplateSection;
