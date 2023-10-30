import PageContainer from 'components/@commons/PageContainer';
import React, { Suspense } from 'react';
import FormSection from './FormSection';
import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from 'apis/userInfo';
import { Navigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import Loader from 'components/Suspenses/Loader';

const AddGroupPage = (): JSX.Element => {
  return (
    <PageContainer withoutHeader withoutBottonBar padding="0 40px" gap="52px">
      <Suspense fallback={<Loader />}>
        <CheckAuth>
          <FormSection />
        </CheckAuth>
      </Suspense>
    </PageContainer>
  );
};

export default AddGroupPage;

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const { data: myInfo } = useQuery(['myInfo'], getMyInfo, { suspense: true, cacheTime: 0 });
  if (myInfo?.data.groupName !== null) {
    alert('이미 그룹이 있습니다');
    return <Navigate to={convertPath('/')} />;
  }
  return <>{children}</>;
};
