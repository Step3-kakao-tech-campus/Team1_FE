import { postAddNewGroup } from 'apis/admin/manageGroup';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import useForm from 'hooks/useForm';
import React from 'react';

import { marketNoValidator, nameValidator } from 'utils/validators';
import DaumPostcodeEmbed from 'react-daum-postcode';
import useModal from 'hooks/useModal';
import InputBar from './InputBar';
import useErrorHandler from 'error/useErrorHandler';
import KakaoAddress from 'components/modals/KakaoAddress';

const FormSection = ({ doneStateHandler }: { doneStateHandler: () => void }): JSX.Element => {
  const initialInfo = {
    marketName: '',
    marketNumber: '',
    mainAddress: '',
    detailAddress: '',
  };

  const { obj: marketInfo, formHandler, etcUpdateHandler } = useForm(initialInfo);
  const { apiErrorHandler } = useErrorHandler();
  const submitHandler = (): void => {
    postAddNewGroup(marketInfo)
      .then((res) => {
        doneStateHandler();
      })
      .catch((err) => {
        apiErrorHandler(err);
      });
  };

  const { modalOnHandler, modalOffHandler } = useModal();

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
          onChange={formHandler}
          labelName="주소1"
          validation={marketInfo.mainAddress.length > 0}
          onClick={() =>
            modalOnHandler(
              <KakaoAddress
                onComplete={(data) => {
                  etcUpdateHandler(data.address, 'mainAddress');
                  modalOffHandler();
                }}
              />,
            )
          }
          value={marketInfo.mainAddress}
        />

        <InputBar id="detailAddress" onChange={formHandler} labelName="상세 주소" validation={false} />
      </FlexContainer>

      <SubmitButton
        onClick={submitHandler}
        disabled={
          !nameValidator(marketInfo.marketName) ||
          !marketNoValidator(marketInfo.marketNumber) ||
          marketInfo.mainAddress.length === 0
        }
      >
        그룹 생성하기
      </SubmitButton>
    </>
  );
};

export default FormSection;
