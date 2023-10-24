import { convertPath } from 'apis/convertURI';
import PageContainer from 'components/@commons/PageContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({
  message,
  btnHandler,
  btnText,
  goMain,
  tryAgain,
}: {
  message: string;
  btnHandler?: () => void;
  btnText?: string;
  goMain?: boolean;
  tryAgain?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <PageContainer withoutHeader withoutBottonBar gap="60px" padding="60px">
      <Text size="xxl">{message}</Text>
      {btnText && <SubmitButton onClick={btnHandler}>{btnText}</SubmitButton>}
      {goMain && <SubmitButton onClick={() => navigate(convertPath('/'))}>메인으로</SubmitButton>}
      {tryAgain && <SubmitButton onClick={() => location.reload()}>다시 시도</SubmitButton>}
    </PageContainer>
  );
};

export default ErrorPage;
