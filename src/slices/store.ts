import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth';
import errorReducer from './error';
import { AuthState } from '../state/auth';
import { ErrorState } from '../state/error';


export interface StoreState {
  auth: AuthState;
  error: ErrorState;
}

const reducer = {
  auth: authReducer,
  error: errorReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;