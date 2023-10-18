import instance from 'apis/instance';

export const postsignup = (userInfo: SignupRequest) => {
  return instance.post(`/auth/join`, userInfo);
};

export const postLogin = (body: LoginRequest) => {
  return instance.post(`/auth/login`, body);
};

export interface SignupRequest {
  code: string;
  userName: string;
  isAdmin: boolean;
}

export interface SignupResponse {
  isAdmin: boolean;
}

export interface LoginRequest {
  code: string;
}

export interface LoginResponse {
  isAdmin: boolean;
}
