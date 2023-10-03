import { addNewGroup } from 'apis/manageGroup';
import FlexContainer from 'components/@commons/FlexContainer';
import GradationBox from 'components/@commons/GradationBox';
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
      <GradationBox width="100%">
        <FlexContainer $gap="0">
          <InputGroup id="marketName" onChange={formHandler} labelName="상호명" />
          <InputGroup id="marketNumber" onChange={formHandler} labelName="사업자 번호" />
          <InputGroup id="mainAddress" onChange={formHandler} labelName="주소1" />
          <InputGroup id="detailAddress" onChange={formHandler} labelName="주소2" />
        </FlexContainer>
      </GradationBox>
      <SubmitButton onClick={submitHandler}>그룹 생성하기</SubmitButton>
    </>
  );
};

export default AddGroup;

const InputGroup = ({ onChange, id, labelName }: InputProps): JSX.Element => {
  return (
    <InputBox $direction="row" $padding="0">
      <Label htmlFor={id}>{labelName}</Label>
      <input className="w-full h-full pl-2" id={id} onChange={onChange} />
    </InputBox>
  );
};

interface InputProps {
  onChange: any;
  id: string;
  labelName?: string;
}

const InputBox = styled(FlexContainer)`
  border-bottom: 1px lightgray solid;
  height: 40px;
`;

const Label = styled.label`
  width: 128px;
  display: flex;
  align-items: center;
  padding-left: 8px;
  font-size: ${({ theme }) => theme.fonts.fontSize.sm};
`;
