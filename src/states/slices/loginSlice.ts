import { createSlice } from '@reduxjs/toolkit';

interface LoginState {
  token: string;
  loginTime: number;
  islogin: boolean;

  // userName: string;
  // userId: number;
  // groupName: string;
  // groupId: number;
  // isAdmin: boolean;

  userData: {
    userName: string;
    userId: number;
    groupName: string;
    groupId: number;
    isAdmin: boolean;
  };
}

const initialState: LoginState = {
  token: '',
  loginTime: 0,
  islogin: false,

  // userName: '',
  // userId: 0,
  // groupName: '',
  // groupId: 0,
  // isAdmin: false,

  userData: {
    userName: '',
    userId: 0,
    groupName: '',
    groupId: 0,
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

      // state.userName = action.payload.userName;
      // state.userId = action.payload.userId;
      // state.groupName = action.payload.groupName;
      // state.groupId = action.payload.groupId;
      // state.isAdmin = action.payload.isAdmin;
    },

    clearUserReducer: (state: LoginState) => {
      state = initialState;

      // state.token = '';
      // state.loginTime = 0;
      // state.islogin = false;

      // state.userData = {
      //   userName: '',
      //   userId: 0,
      //   groupName: '',
      //   groupId: 0,
      //   isAdmin: false,
      // };
    },
  },
});

export const { setUserReducer, clearUserReducer } = loginSlice.actions;
export default loginSlice.reducer;
