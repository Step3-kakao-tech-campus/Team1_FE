import { useAtom } from 'jotai';
import React, { Suspense } from 'react';
import { selectedWeekAtom } from '..';
import Text from 'components/@commons/Text';
import OpenDetail from './OpenDetail';
import InProgressDetail from './InProgressDetail';
import ClosedDetail from './ClosedDetail';

const WeeklyDatailSection = (): JSX.Element => {
  const [selectedWeek] = useAtom(selectedWeekAtom);

  switch (selectedWeek.weekStatus) {
    case 'allocatable':
      return <OpenDetail startWeekDate={selectedWeek.startWeekDate} />;
    case 'inProgress':
      return (
        <Suspense>
          <InProgressDetail startWeekDate={selectedWeek.startWeekDate} />
        </Suspense>
      );
    case 'closed':
      return (
        <Suspense>
          <ClosedDetail startWeekDate={selectedWeek.startWeekDate} />
        </Suspense>
      );
  }
  return <Text>주차를 선택해 주세요</Text>;
};

export default WeeklyDatailSection;
