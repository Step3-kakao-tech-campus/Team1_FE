import instance from 'apis/instance';

export const postsignup = (userInfo: SignupRequest): Promise<LoginResponse> => {
  return instance.post(`/auth/join`, userInfo);
};

export const postLogin = (body: LoginRequest): Promise<LoginResponse> => {
  return instance.post(`/auth/login`, body);
};

export interface SignupRequest {
  code: string;
  userName: string;
  isAdmin: boolean;
}

interface LoginRequest {
  code: string;
}

interface LoginResponse {
  headers: {
    authorization: string;
  };
  data: {
    isAdmin: boolean;
  };
}
