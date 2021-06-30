import { configureStore } from '@reduxjs/toolkit';
import CredentialReducer from './CredentialSlice';
//import { combineReducers } from 'redux';

/*const reducer = combineReducers({
  credential: credentialSlice,
});*/
const store = configureStore({
  reducer: {
    credentials: CredentialReducer,
  },
});

export default store;
