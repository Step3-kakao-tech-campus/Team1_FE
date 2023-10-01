import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loginSlice } from 'states/slices/loginSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login'],
};

const rootReducer = combineReducers({
  login: loginSlice.reducer,
});

export type ReducerType = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
