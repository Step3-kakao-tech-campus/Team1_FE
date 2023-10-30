import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import React from 'react';
import { marketNoValidator, nameValidator } from 'utils/validators';
import InputBar from './InputBar';
import useAddGroupForm from 'hooks/admin/AddGroupPage/useAddGroupForm';

const FormSection = (): JSX.Element => {
  const { marketInfo, formHandler, selectAddress, addGroupValidator, addGroupSubmit } = useAddGroupForm();

  return (
    <>
      <Text size="xxl" weight="semiBold">
        그룹 생성하기
      </Text>

      <FlexContainer $gap="20px" $wFull>
        <InputBar
          id="marketName"
          onChange={formHandler}
          labelName="상호명"
          validation={nameValidator(marketInfo.marketName)}
        />
        <InputBar
          id="marketNumber"
          onChange={formHandler}
          labelName="사업자 번호"
          validation={marketNoValidator(marketInfo.marketNumber)}
          inputType="number"
        />
        <InputBar
          id="mainAddress"
          labelName="주소"
          validation={marketInfo.mainAddress.length > 0}
          onClick={selectAddress}
          value={marketInfo.mainAddress}
          readOnly
        />

        <InputBar id="detailAddress" onChange={formHandler} labelName="상세 주소" validation={false} />
      </FlexContainer>

      <SubmitButton onClick={addGroupSubmit} disabled={!addGroupValidator()}>
        그룹 생성하기
      </SubmitButton>
    </>
  );
};

export default FormSection;
