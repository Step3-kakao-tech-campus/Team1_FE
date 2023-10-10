import PageContainer from 'components/@commons/PageContainer';
import AddGroup from 'pages/admin-AddGroupPage/AddGroup';
import AddGroupDone from 'pages/admin-AddGroupPage/AddGroupDone';
import React, { useState } from 'react';

const AddGroupPage = (): JSX.Element => {
  // 해당 매니저가 이미 그룹을 가지고 있는 경우 : 리다이렉트 "/"
  const [isDone, setIsDone] = useState(false);

  return (
    <PageContainer withoutHeader withoutBottonBar padding="0 40px">
      {isDone ? <AddGroupDone /> : <AddGroup doneStateHandler={() => setIsDone((prev) => true)} />}
    </PageContainer>
  );
};

export default AddGroupPage;
