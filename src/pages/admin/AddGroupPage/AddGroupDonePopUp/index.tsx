import { convertPath } from 'apis/convertURI';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import usePopUpPage from 'hooks/usePopUpPage';
import { useNavigate } from 'react-router-dom';

const AddGroupDonePopUp = (): JSX.Element => {
  const navigate = useNavigate();
  const { popUpOffHandler } = usePopUpPage();
  const submitHandler = () => {
    popUpOffHandler();
    navigate(convertPath('/'));
  };
  return (
    <FlexContainer $wFull $hFull $gap="60px" $padding="24px">
      <FlexContainer>
        <Text size="xxl" weight="bold">
          매장 등록에 성공했습니다
        </Text>
        <Text size="xl">이제 근무일정을 관리하세요</Text>
      </FlexContainer>

      <SubmitButton onClick={submitHandler}>메인으로 이동</SubmitButton>
    </FlexContainer>
  );
};

export default AddGroupDonePopUp;
