import { TimeData } from 'apis/types';
import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import { CloseCircleButton } from 'components/@commons/icons/buttons';
import { ButtonContainer, InputTime, InputTitle } from 'components/PageStyledComponents/admin/ApplicationOpenPage';
import useFormOnBlurUpdate from 'hooks/useFormOnBlurUpdate';

interface Props {
  timeData: TimeData;
  timeIndex: number;
  updater: (id: string, value: string, index: number) => void;
  deleteHandler: (i: number) => void;
}

export const OpenTimeInputs = ({ timeData, timeIndex, updater, deleteHandler }: Props) => {
  const { val, onBlurHandler, onChangeHandler } = useFormOnBlurUpdate<TimeDataIndex>(
    timeData as TimeDataIndex,
    (value: string, id: string) => updater(value, id, timeIndex),
  );

  return (
    <>
      <FlexContainer $position="relative" $direction="row" $wFull>
        <InputTitle
          id="title"
          value={val['title']}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          placeholder="시간대 이름을 입력하세요"
        />
        <ButtonContainer>
          <CloseCircleButton onClick={() => deleteHandler(timeIndex)} />
        </ButtonContainer>
      </FlexContainer>

      <FlexContainer $direction="row">
        <InputTime
          id="startTime"
          value={val['startTime']}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          type="time"
        />
        <Text margin="0">~</Text>
        <InputTime id="endTime" value={val['endTime']} onChange={onChangeHandler} onBlur={onBlurHandler} type="time" />
      </FlexContainer>
    </>
  );
};

interface TimeDataIndex extends TimeData {
  [index: string]: string;
}
