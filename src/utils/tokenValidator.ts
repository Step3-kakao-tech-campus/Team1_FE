window.Buffer = window.Buffer || require('buffer').Buffer;

const tokenValidator = (token: string) => {
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64');
  try {
    const data = JSON.parse(payload.toString());
    return true;
  } catch {
    console.log('토큰 형식이 올바르지 않음');
    return false;
  }
};

export default tokenValidator;
