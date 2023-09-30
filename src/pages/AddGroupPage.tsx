import { addNewGroup } from 'apis/manageGroup';
import useForm from 'hooks/useForm';
import React, { useState } from 'react';

interface MarketInfo {
  marketName: string;
  marketNumber: string;
  mainAddress: string;
  detailAddress: string;
}
const AddGroupPage = (): JSX.Element => {
  const initialInfo: MarketInfo = {
    marketName: '',
    marketNumber: '',
    mainAddress: '',
    detailAddress: '',
  };

  const { obj, formHandler } = useForm(initialInfo);
  const [isDone, setIsDone] = useState(false);

  const submitHandler = (): void => {
    addNewGroup(obj)
      .then((res) => {
        setIsDone((prev) => true);
      })
      .catch((err) => {
        // 에러 처리
      });
  };
  return (
    <div>
      {isDone ? (
        <div> 그룹 가입 완료</div>
      ) : (
        <div>
          <label htmlFor="marketName">매장 이름을 입력하세요</label>
          <input id="marketName" onChange={formHandler} />

          <label htmlFor="marketNumber">사업자 번호를 입력하세요</label>
          <input id="marketNumber" onChange={formHandler} />

          <label htmlFor="mainAddress">이름을 입력하세요</label>
          <input id="mainAddress" onChange={formHandler} />

          <label htmlFor="detailAddress">이름을 입력하세요</label>
          <input id="detailAddress" onChange={formHandler} />

          <button onClick={submitHandler}>그룹 생성하기</button>
        </div>
      )}

      <p>{JSON.stringify(obj)}</p>
    </div>
  );
};

export default AddGroupPage;
