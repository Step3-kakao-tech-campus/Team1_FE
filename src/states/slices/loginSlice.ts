import { createSlice } from '@reduxjs/toolkit';

interface LoginState {
  token: string;
  loginTime: number;
  islogin: boolean;
}

const initialState: LoginState = {
  token: '',
  loginTime: 0,
  islogin: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserReducer: (state: LoginState, action) => {
      state.token = action.payload.token;
      state.loginTime = action.payload.loginTime;
      state.islogin = action.payload.islogin;
    },

    clearUserReducer: (state: LoginState) => {
      state.token = '';
      state.loginTime = 0;
      state.islogin = false;
    },
  },
});

export const { setUserReducer, clearUserReducer } = loginSlice.actions;
export default loginSlice.reducer;
