import { createReducer, createSlice } from '@reduxjs/toolkit';

export const CredentialShareSlice = createSlice({
  name: 'credentialShares',
  initialState: {
    shared: [
      {
        id: Math.random().toString(),
        credential_id: 1,
        //shared_date: Date.now().toString(),
        //expiry_date: new Date().setDate(new Date().getDate() + 14),
        verifier: 'ei anna tenesteee',
      },
      {
        id: Math.random().toString(),
        credential_id: 1,
        //shared_date: Date.now().toString(),
        //expiry_date: new Date().setDate(new Date().getDate() + 14),
        verifier: 'ei annaaaa teneste',
      },
      {
        id: Math.random().toString(),
        credential_id: 0,
        //shared_date: Date.now().toString(),
        //expiry_date: new Date().setDate(new Date().getDate() + 14),
        verifier: 'ei annaaaa teneste',
      },
    ],
  },
  reducers: {
    addCredentialShare: (state, action) => {
      state.push(action.payload);
    },
    removeCredentialShare: (state, action) => {
      state.splice(
        state.findIndex((item) => item.id == action.payload),
        1
      );
    },
  },
});

const { actions, reducer } = CredentialShareSlice;

export const { addCredentialShare, removeCredentialShare } = actions;

export default reducer;
