import PageContainer from 'components/@commons/PageContainer';
import Loader from 'components/Suspenses/Loader';
import useLogin from 'hooks/useLogin';
import React, { useEffect } from 'react';

const KakaoAuthPage = (): JSX.Element => {
  const { login } = useLogin();
  const code: string | null = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    if (code === null) return;
    login(code);
  }, [code]);

  return (
    <PageContainer withoutHeader withoutBottonBar>
      <Loader />
    </PageContainer>
  );
};

export default KakaoAuthPage;
