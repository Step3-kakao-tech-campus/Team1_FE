import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import { getRecommends, postRecommends } from 'apis/adminApplication';
import { useQuery } from '@tanstack/react-query';

const useClose = (startWeekDate: string) => {
  const { data: recommendsRes } = useQuery(
    ['getRecommends', startWeekDate],
    () => getRecommends({ startWeekDate: startWeekDate }),
    { suspense: true },
  );
  const [candidate, setCandidate] = useState(0);

  const selectHandler = (candidateNo: number) => {
    setCandidate(candidateNo);
  };

  const navigate = useNavigate();
  const submitHandler = () => {
    postRecommends({ selection: candidate })
      .then((res) => {
        navigate(convertPath('/'));
      })
      .catch((err) => {
        // 에러 처리
      });
  };

  return { recommendsRes, selectHandler, candidate, submitHandler };
};

export default useClose;
