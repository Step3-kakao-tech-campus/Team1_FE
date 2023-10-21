import React from 'react';
import BorderBox from 'components/@commons/BorderBox';
import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import useApply from 'hooks/alba/useApply';
import { stringDateMove } from 'utils/stringDateMove';
import weekdayArray from 'utils/weekdayArray';
import SubmitButton from 'components/@commons/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import { myTheme } from 'styles/myTheme';

const PreviewSection = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const { weeklySelect, findTimeData, setStep } = useApply(startWeekDate);
  const navigate = useNavigate();

  const processTime = (dayIndex: number) => {
    const processed = weeklySelect[dayIndex]
      .filter((object) => object.isChecked)
      .map((object) => findTimeData(object.workTimeId).title);

    if (processed.length === 0) return '휴무';

    return processed.join(' | ');
  };

  const stringDateToKor = (string: string, dayIndex: number) => {
    const [y, m, d] = string.split('-').map((e) => Number.parseInt(e));
    const date = new Date(y, m - 1, d + dayIndex);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <FlexContainer $wFull $gap="36px">
      <button onClick={() => setStep(1)}> 편집하기 </button>
      <FlexContainer $wFull>
        {weekdayArray.map((weekday, dayIndex) => (
          <BorderBox gradation key={`${dayIndex}요일`}>
            <FlexContainer $wFull $direction="row" $padding="20px 24px" $gap="0">
              <Text size="lg" margin="0">
                {stringDateToKor(startWeekDate, dayIndex)}
              </Text>
              <Text size="lg" margin="0 auto 0 28px">
                {weekday.kor}
              </Text>
              <Text
                margin="0 0 0 auto"
                size="lg"
                color={processTime(dayIndex) === '휴무' ? myTheme.color.gray : '#0066FF'}
                weight="semiBold"
              >
                {processTime(dayIndex)}
              </Text>
            </FlexContainer>
          </BorderBox>
        ))}
      </FlexContainer>
      <SubmitButton onClick={() => navigate(convertPath('/'))}>제출하기</SubmitButton>
    </FlexContainer>
  );
};

export default PreviewSection;
