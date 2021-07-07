import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import CredentialReducer from './CredentialSlice';
import CredentialShareReducer from './CredentialShareSlice';
import SignedInReducer from './SignedInSlice';

const reducer = combineReducers({
    credentials: CredentialReducer,
    credentialShares: CredentialShareReducer,
    signedInStatus: SignedInReducer,
});

const store = configureStore({
    reducer,
});

export default store;
