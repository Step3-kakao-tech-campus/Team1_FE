import { addNewGroup } from 'apis/manageGroup';
import SubmitButton from 'components/@commons/SubmitButton';
import useForm from 'hooks/useForm';
import React from 'react';
import styled from 'styled-components';

interface Props {
  doneStateHandler: () => void;
}

const AddGroup = ({ doneStateHandler }: Props): JSX.Element => {
  interface MarketInfo {
    marketName: string;
    marketNumber: string;
    mainAddress: string;
    detailAddress: string;
  }

  const initialInfo: MarketInfo = {
    marketName: '',
    marketNumber: '',
    mainAddress: '',
    detailAddress: '',
  };

  const { obj, formHandler } = useForm(initialInfo);
  const submitHandler = (): void => {
    addNewGroup(obj)
      .then((res) => {
        doneStateHandler();
      })
      .catch((err) => {
        // 에러 처리
      });
  };
  return (
    <>
      <span className="text-center text-xl font-bold">그룹 생성</span>
      <GradationBox>
        <InputGroup id="marketName" onChange={formHandler} labelName="상호명" />
        <InputGroup id="marketNumber" onChange={formHandler} labelName="사업자 번호" />
        <InputGroup id="mainAddress" onChange={formHandler} labelName="주소1" />
        <InputGroup id="detailAddress" onChange={formHandler} labelName="주소2" />
      </GradationBox>
      <SubmitButton onClick={submitHandler}>그룹 생성하기</SubmitButton>
    </>
  );
};

export default AddGroup;

const GradationBox = styled.div`
  background: ${({ theme }) => theme.color.backgroundColor};
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding: 20px;
`;

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
interface InputProps {
  onChange: any;
  id: string;
  labelName?: string;
}
