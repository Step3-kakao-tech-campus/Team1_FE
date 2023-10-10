import { createSlice } from '@reduxjs/toolkit';

interface LoginState {
  token: string;
  loginTime: number;
  islogin: boolean;

  userData: {
    userName: string;
    groupName: string;
    isAdmin: boolean;
  };
}

const initialState: LoginState = {
  token: '',
  loginTime: 0,
  islogin: false,

  userData: {
    userName: '',
    groupName: '',
    isAdmin: false,
  },
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserReducer: (state: LoginState, action) => {
      state.token = action.payload.token;
      state.loginTime = action.payload.loginTime;
      state.islogin = action.payload.islogin;
      state.userData = action.payload.userData;
    },

    clearUserReducer: (state: LoginState) => {
      state.token = '';
      state.loginTime = 0;
      state.islogin = false;

      state.userData = {
        userName: '',
        groupName: '',
        isAdmin: false,
      };
    },
  },
});

export const { setUserReducer, clearUserReducer } = loginSlice.actions;
export default loginSlice.reducer;
