window.Buffer = window.Buffer || require('buffer').Buffer;

interface ClaimType {
  userName: string;
  userId: number;
  isAdmin: boolean;
  groupName: string;
  groupId: number;
}

const getInfoByToken = (token: string) => {
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64');
  try {
    const data: ClaimType = JSON.parse(payload.toString());
    return data;
  } catch {
    console.log('토큰 형식이 올바르지 않음');
    return;
  }
};

export default getInfoByToken;
