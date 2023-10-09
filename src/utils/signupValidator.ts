interface Info {
  userName: string;
  agreement: boolean;
}
const signupValidator = <T extends Info>(userInfo: T): boolean => {
  return userInfo.userName.length >= 2 && userInfo.agreement == true;
};

export default signupValidator;
