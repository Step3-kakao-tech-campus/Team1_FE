export const isOnlyKorEng = (string: string) => {
  const regex = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/;
  return regex.test(string);
};

export const isOnlyNumber = (string: string) => {
  const regex = /^[0-9]+$/;
  return regex.test(string);
};

export const nameValidator = (string: string) => {
  const regex = /^[가-힣a-zA-Z -]{2,}$/;
  return string.at(-1) !== ' ' && regex.test(string);
};

export const marketNoValidator = (string: string) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(string);
};

export const signupValidator = (userInfo: Info): boolean => {
  return userInfo.isAdmin !== null && nameValidator(userInfo.userName) && userInfo.agreement === true;
};
interface Info {
  userName: string;
  agreement: boolean;
  isAdmin: boolean | null;
}
