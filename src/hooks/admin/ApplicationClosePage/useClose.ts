import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import { postRecommends } from 'apis/admin/application/close';
import useErrorHandler from 'error/useErrorHandler';

const useClose = () => {
  // 선택된 후보, 후보 선택시 상태 업데이트
  const [candidate, setCandidate] = useState(0);

  // 제출 클릭시 post 요청
  const navigate = useNavigate();
  const { apiErrorHandler } = useErrorHandler();
  const submitHandler = () => {
    postRecommends({ selection: candidate + 1 })
      .then((res) => {
        navigate(convertPath('/'));
      })
      .catch((err) => {
        apiErrorHandler(err);
      });
  };

  return { candidate, setCandidate, submitHandler };
};

export default useClose;
