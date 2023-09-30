import HeaderNB from 'components/organisms/HeaderNB';
import React from 'react';
import MainContainer from './MainContainer';
import BottomNB from 'components/organisms/BottomNB';

type Props = {};

const PageContainer = (props: Props) => {
  return (
    <div>
      <HeaderNB />
      <MainContainer />
      <BottomNB />
    </div>
  );
};

export default PageContainer;
