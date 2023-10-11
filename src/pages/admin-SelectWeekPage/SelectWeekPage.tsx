import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';
import React, { Suspense } from 'react';
import Text from 'components/@commons/Text';
import { atom, useAtom } from 'jotai';
import CalenderOutter from 'components/@commons-feature/calendar/CalenderOutter';
import SelectWeekInner from './SelectWeekInner';

export const weekStatusMonthAtom = atom({ year: new Date().getFullYear(), month: new Date().getMonth() });
export const selectedWeekAtom = atom('');

const SelectWeekPage = (): JSX.Element => {
  const [selectedWeek] = useAtom(selectedWeekAtom);
  return (
    <PageContainer justify="start">
      <FlexContainer $wFull $align="center">
        {selectedWeek === '' && <Text>주차를 선택하세요</Text>}
      </FlexContainer>

      <FlexContainer $wFull>
        <CalenderOutter monthDataAtom={weekStatusMonthAtom}>
          <Suspense>
            <SelectWeekInner />
          </Suspense>
        </CalenderOutter>
      </FlexContainer>
    </PageContainer>
  );
};

export default SelectWeekPage;
