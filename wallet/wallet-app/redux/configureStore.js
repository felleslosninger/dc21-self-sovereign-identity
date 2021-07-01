import { configureStore } from '@reduxjs/toolkit';
import CredentialReducer from './CredentialSlice';
import CredentialShareReducer from './CredentialShareSlice';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  credentials: CredentialReducer,
  credentialShares: CredentialShareReducer,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
