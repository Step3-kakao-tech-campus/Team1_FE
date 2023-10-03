import { addNewGroup } from 'apis/manageGroup';
import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import useForm from 'hooks/useForm';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  const navigate = useNavigate();
  return (
    <PageContainer>
      {isDone ? (
        <FlexContainer $wFull={true} $align="stretch" $gap="60px" $padding="24px">
          {/* <FlexContainer>
            <span className="text-center text-2xl font-bold">그룹 생성에 성공했습니다</span>
            <span className="text-center text-xl">이제 근무일정을 관리하세요</span>
          </FlexContainer>

          <SubmitButton onClick={() => navigate(convertPath('/'))}>메인으로 이동</SubmitButton> */}
        </FlexContainer>
      ) : (
        <>
          <GradationBox>
            <InputGroup id="marketName" onChange={formHandler} labelName="상호명" />
            <InputGroup id="marketNumber" onChange={formHandler} labelName="사업자 번호" />
            <InputGroup id="mainAddress" onChange={formHandler} labelName="주소1" />
            <InputGroup id="detailAddress" onChange={formHandler} labelName="주소2" />
          </GradationBox>
          <SubmitButton onClick={submitHandler}>그룹 생성하기</SubmitButton>
        </>
      )}
    </PageContainer>
  );
};

export default AddGroupPage;

const GradationBox = styled.div`
  background: ${({ theme }) => theme.color.backgroundColor};
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding: 20px;
`;

interface InputProps {
  onChange: any;
  id: string;
  labelName?: string;
}
const InputGroup = ({ onChange, id, labelName }: InputProps): JSX.Element => {
  return (
    <div className="flex h-8 items-center">
      <label className="w-32" htmlFor={id}>
        {labelName}
      </label>
      <input className="w-full h-full" id={id} onChange={onChange} />
    </div>
  );
};
