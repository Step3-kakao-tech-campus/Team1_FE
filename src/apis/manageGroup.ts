import instance from 'apis/instance';

interface MarketInfo {
  marketName: string;
  marketNumber: string;
  mainAddress: string;
  detailAddress: string;
}

export const addNewGroup = ({ marketName, marketNumber, mainAddress, detailAddress }: MarketInfo) => {
  return instance.post(`/group`, {
    marketName: marketName,
    marketNumber: marketNumber,
    mainAddress: mainAddress,
    detailAddress: detailAddress,
  });
};

export const getGroupMemberList = () => {
  return instance.get(`/group`);
};
