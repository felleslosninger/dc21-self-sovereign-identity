import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import CredentialReducer from './CredentialSlice';
import CredentialShareReducer from './CredentialShareSlice';

const reducer = combineReducers({
    credentials: CredentialReducer,
    credentialShares: CredentialShareReducer,
});

const store = configureStore({
    reducer,
});

export default store;
