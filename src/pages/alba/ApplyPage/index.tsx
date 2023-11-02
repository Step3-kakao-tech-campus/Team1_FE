import React from 'react';
import { useLocation } from 'react-router-dom';
import PageContainer from 'components/@commons/PageContainer';
import TimeSelectSection from './TimeSelectSection';
import useErrorHandler from 'error/useErrorHandler';
import PreviewSection from './PreviewSection';
import usePopUpPage from 'hooks/usePopUpPage';
import SubmitButton from 'components/@commons/SubmitButton';

const ApplyPage = (): JSX.Element => {
  // startWeekDate 값 불러오기
  const state = useLocation().state;

  // startWeekDate 값 없을때 에러 처리
  const { wrongPathHandler } = useErrorHandler();
  if (state === null) {
    wrongPathHandler('/apply');
  }

  // 미리보기 페이지
  const previewPage = <PreviewSection startWeekDate={state.startWeekDate} />;
  const { popUpOnHandler } = usePopUpPage();

  return (
    <PageContainer justify="start" gap="40px">
      <TimeSelectSection startWeekDate={state.startWeekDate} previewPage={previewPage} />
      <SubmitButton onClick={() => popUpOnHandler(previewPage)}>미리보기</SubmitButton>
    </PageContainer>
  );
};

export default ApplyPage;
