import { convertPath } from 'apis/convertURI';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import React from 'react';
import { Link } from 'react-router-dom';

const DoneSection = (): JSX.Element => {
  return (
    <FlexContainer $wFull $gap="60px" $padding="24px">
      <FlexContainer>
        <Text size="xxl" weight="bold">
          그룹 생성에 성공했습니다
        </Text>
        <Text size="xl">이제 근무일정을 관리하세요</Text>
      </FlexContainer>

      <Link to={convertPath('/')}>
        <SubmitButton>메인으로 이동</SubmitButton>
      </Link>
    </FlexContainer>
  );
};

export default DoneSection;
