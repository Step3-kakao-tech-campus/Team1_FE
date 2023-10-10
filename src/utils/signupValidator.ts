const signupValidator = (userInfo: any): boolean => {
  return userInfo.userName.length >= 2 && userInfo.agreement == true;
};

export default signupValidator;
