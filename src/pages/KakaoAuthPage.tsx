import { convertPath } from 'apis/convertURI';
import PageContainer from 'components/@commons/PageContainer';
import Loader from 'components/Suspenses/Loader';
import useLogin from 'hooks/auth/useLogin';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const KakaoAuthPage = (): JSX.Element => {
  const { login } = useLogin();
  const [searchParams] = useSearchParams();
  const code: string | null = searchParams.get('code');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (code === null) {
      alert('다시 시도하세요');
      navigate(convertPath('/'));
      return;
    }
    if (code === sessionStorage.getItem('code')) {
      navigate(convertPath('/'));
      return;
    }

    login(code);
    sessionStorage.setItem('code', code);
  }, [code]);

  return (
    <PageContainer withoutHeader withoutBottonBar>
      <Loader />
    </PageContainer>
  );
};

export default KakaoAuthPage;
