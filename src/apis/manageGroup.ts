import instance from 'apis/instance';

interface MarketInfo {
  marketName: string;
  marketNumber: string;
  mainAddress: string;
  detailAddress: string;
}

export const addNewGroup = async ({ marketName, marketNumber, mainAddress, detailAddress }: MarketInfo) => {
  return await instance.post(`/group`, {
    marketName: marketName,
    marketNumber: marketNumber,
    mainAddress: mainAddress,
    detailAddress: detailAddress,
  });
};

export const getGroupMemberList = async () => {
  return await instance.get(`/group`);
};
