import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import useLogin from 'pages/auth/hooks/useLogin';

interface Props {
  redirectPage?: string;
}

const LoginOrSignup = ({ redirectPage = '/' }: Props): JSX.Element => {
  const { loginBtnHandler } = useLogin(redirectPage);
  return (
    <FlexContainer $wFull>
      <SubmitButton onClick={() => loginBtnHandler()}>카카오로 로그인하기</SubmitButton>
      <SubmitButton $hasBorder $activeColor="white" onClick={() => loginBtnHandler()}>
        카카오로 시작하기
      </SubmitButton>
    </FlexContainer>
  );
};

export default LoginOrSignup;
