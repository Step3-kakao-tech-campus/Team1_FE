import { convertPath } from 'apis/convertURI';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import { Link } from 'react-router-dom';

const NoApplicant = (): JSX.Element => {
  return (
    <FlexContainer $wFull $hFull>
      <FlexContainer $gap="36px">
        <FlexContainer $gap="8px">
          <Text>신청자가 부족해</Text>
          <Text>해당 주차 스케줄을 마감할 수 없습니다.</Text>
        </FlexContainer>
        <Link to={convertPath('/newSchedule')}>
          <SubmitButton>뒤로가기</SubmitButton>
        </Link>
      </FlexContainer>
    </FlexContainer>
  );
};

export default NoApplicant;
