import { useMutation, useQuery } from '@tanstack/react-query';
import { getGroupInfo, postGroupJoin } from 'apis/alba/joinGroup';

export const useGetInvitation = (invitationKey: string) => {
  const { data: marketData } = useQuery(
    ['invitation', invitationKey],
    () => getGroupInfo({ invitationKey: invitationKey }),
    {
      suspense: true,
      onError: (error: any) => {
        if (error.response.data.error === -20004) {
          throw error;
        }
        throw error;
      },
    },
  );
  return { marketData };
};

export const usePostGroupJoin = (invitationKey: string, onSuccess: () => void) => {
  const { mutate: postGroupJoinMutate } = useMutation(
    ['postGroupJoin', invitationKey],
    () => postGroupJoin({ invitationKey: invitationKey }),
    {
      onSuccess: onSuccess,
    },
  );
  return { postGroupJoinMutate };
};
