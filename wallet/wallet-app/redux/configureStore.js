import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import CredentialReducer from './CredentialSlice';
import CredentialShareReducer from './CredentialShareSlice';
import SignedInReducer from './SignedInSlice';
import SpinnerReducer from './SpinnerSlice';

const reducer = combineReducers({
    credentials: CredentialReducer,
    credentialShares: CredentialShareReducer,
    signedInStatus: SignedInReducer,
    spinnerStatus: SpinnerReducer,
});

const store = configureStore({
    reducer,
});

export default store;
