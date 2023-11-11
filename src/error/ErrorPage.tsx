import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import { loginDatahandlers } from 'utils/loginDatahandlers';

const ErrorPage = ({
  message,
  btnHandler,
  btnText,
  isNeedLogout = true,
}: {
  message: string;
  btnHandler: () => void;
  btnText?: string;
  isNeedLogout?: boolean;
}) => {
  const goMainHandler = () => {
    btnHandler();
    if (isNeedLogout) {
      loginDatahandlers.removeLoginData();
    }
  };
  return (
    <FlexContainer $hFull $wFull $gap="60px" $padding="60px">
      <Text size="xxl">{message}</Text>
      <SubmitButton onClick={() => goMainHandler()}>{btnText}</SubmitButton>
    </FlexContainer>
  );
};

export default ErrorPage;
