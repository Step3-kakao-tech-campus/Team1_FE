interface Info {
  userName: string;
  agreement: boolean;
  isAdmin: boolean | null;
}
const signupValidator = <T extends Info>(userInfo: T): boolean => {
  return userInfo.isAdmin !== null && userInfo.userName.length >= 2 && userInfo.agreement == true;
};

export default signupValidator;
