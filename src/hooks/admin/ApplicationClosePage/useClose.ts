import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import { useQuery } from '@tanstack/react-query';
import { getRecommends, postRecommends } from 'apis/admin/application/close';
import useErrorHandler from 'error/useErrorHandler';

const useClose = (startWeekDate: string) => {
  // 후보 별 weekly 스케줄 정보 불러오기
  const { data: recommendsRes } = useQuery(
    ['getRecommends', startWeekDate],
    () => getRecommends({ startWeekDate: startWeekDate }),
    { suspense: true },
  );

  // 선택된 후보, 후보 선택시 상태 업데이트
  const [candidate, setCandidate] = useState(0);
  const selectHandler = (candidateNo: number) => {
    setCandidate(candidateNo);
  };

  // 제출 클릭시 post 요청
  const navigate = useNavigate();
  const { commonErrorHandler } = useErrorHandler();
  const submitHandler = () => {
    postRecommends({ selection: candidate + 1 })
      .then((res) => {
        navigate(convertPath('/'));
      })
      .catch((err) => {
        commonErrorHandler(err);
      });
  };

  return { recommendsRes, selectHandler, candidate, submitHandler };
};

export default useClose;
