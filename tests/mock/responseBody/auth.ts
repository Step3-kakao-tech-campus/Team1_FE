export const postLoginNoUser = {
  status: 404,
  body: JSON.stringify({
    errorCode: -10006,
  }),
};

export const postLoginAdmin = {
  token: 'Bearer ABC',
  isAdmin: true,
};
export const postLoginAlba = {
  token: 'Bearer ABC',
  isAdmin: false,
};