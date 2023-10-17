import { addNewGroup } from 'apis/manageGroup';
import FlexContainer from 'components/@commons/FlexContainer';
import GradationBox from 'components/@commons/GradationBox';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import useForm from 'hooks/useForm';
import React from 'react';
import styled from 'styled-components';

interface MarketInfo {
  marketName: string;
  marketNumber: string;
  mainAddress: string;
  detailAddress: string;
}

interface Props {
  doneStateHandler: () => void;
}

const AddGroup = ({ doneStateHandler }: Props): JSX.Element => {
  const initialInfo: MarketInfo = {
    marketName: '',
    marketNumber: '',
    mainAddress: '',
    detailAddress: '',
  };

  const { obj: marketInfo, formHandler } = useForm(initialInfo);
  const submitHandler = (): void => {
    addNewGroup<MarketInfo>(marketInfo)
      .then((res) => {
        doneStateHandler();
      })
      .catch((err) => {
        // 에러 처리
      });
  };
  return (
    <>
      <Text size="xxl" weight="semiBold">
        그룹 생성하기
      </Text>
      <GradationBox width="100%">
        <FlexContainer $gap="0">
          <InputBar id="marketName" onChange={formHandler} labelName="상호명" />
          <InputBar id="marketNumber" onChange={formHandler} labelName="사업자 번호" />
          <InputBar id="mainAddress" onChange={formHandler} labelName="주소1" />
          <InputBar id="detailAddress" onChange={formHandler} labelName="주소2" />
        </FlexContainer>
      </GradationBox>
      <SubmitButton onClick={submitHandler}>그룹 생성하기</SubmitButton>
    </>
  );
};

export default AddGroup;

const InputBar = ({ onChange, id, labelName }: InputProps): JSX.Element => {
  return (
    <InputCont $direction="row" $padding="0">
      <Label htmlFor={id}>{labelName}</Label>
      <Input id={id} onChange={onChange} />
    </InputCont>
  );
};

interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  labelName?: string;
}

const InputCont = styled(FlexContainer)`
  border-bottom: 1px lightgray solid;
  height: 40px;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 8px;
`;

const Label = styled.label`
  width: 128px;
  display: flex;
  align-items: center;
  padding-left: 8px;
  font-size: ${({ theme }) => theme.fonts.fontSize.sm};
`;
