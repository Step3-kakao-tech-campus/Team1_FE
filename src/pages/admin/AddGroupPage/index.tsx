import PageContainer from 'components/@commons/PageContainer';
import React, { Suspense, useEffect } from 'react';
import FormSection from './FormSection';
import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import Loader from 'components/Suspenses/Loader';
import useGetMyInfo from 'hooks/useGetMyInfo';

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
  const { userType } = useGetMyInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (userType !== 'ADMIN_NO_GROUP') {
      alert('이미 그룹이 있습니다');
      navigate(convertPath('/'));
      return;
    }
  }, [userType]);

  return <>{children}</>;
};
