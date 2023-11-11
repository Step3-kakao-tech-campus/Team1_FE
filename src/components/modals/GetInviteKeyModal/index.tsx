import { useQuery } from '@tanstack/react-query';
import { getInviteKey } from 'apis/admin/manageGroup';
import { baseURL } from 'apis/convertURI';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import { CheckIcon } from 'components/@commons/icons';
import Loader from 'components/Suspenses/Loader';
import { LinkBox } from 'components/modals/GetInviteKeyModal/styles';
import useModal from 'hooks/useModal';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { myTheme } from 'styles/myTheme';

const GetInviteKeyModal = (): JSX.Element => {
  const { data: inviteKeyData, isFetching } = useQuery(['inviteKey'], getInviteKey);
  const { modalOffHandler } = useModal();
  const [isCopied, setIsCopied] = useState(false);
  const link = `${baseURL}/invited/${inviteKeyData?.invitationKey}`;

  return (
    <FlexContainer $wFull $padding="20px" $gap="30px" data-testid="초대링크모달">
      <FlexContainer $gap="10px">
        <Text size="xl" weight="bold">
          초대 링크
        </Text>
        <Text>아래 링크에 접속하면 그룹에 가입됩니다.</Text>
      </FlexContainer>
      <FlexContainer $wFull $height="44px">
        {isFetching ? <Loader size="1.5rem" isDeffered={false} /> : <LinkBox value={link} readOnly />}
      </FlexContainer>
      <FlexContainer $gap="10px">
        {isFetching && (
          <SubmitButton>
            <Loader size="1.3rem" isDeffered={false} />
          </SubmitButton>
        )}
        {!isFetching && (
          <CopyToClipboard text={link}>
            {!isCopied ? (
              <SubmitButton onClick={() => setIsCopied(true)}>복사하기</SubmitButton>
            ) : (
              <SubmitButton>
                <Text margin="0 0.3rem 0 0">복사됨</Text>
                <CheckIcon size="1rem" />
              </SubmitButton>
            )}
          </CopyToClipboard>
        )}
        <SubmitButton $hasBorder $activeColor={myTheme.color.backgroundColor} onClick={() => modalOffHandler()}>
          닫기
        </SubmitButton>
      </FlexContainer>
    </FlexContainer>
  );
};

export default GetInviteKeyModal;
