import { createReducer, createSlice } from '@reduxjs/toolkit';

/*
const credentialsReducer = createReducer([], (builder) => {
  builder
    .addCase('ADD_CREDENTIAL', (state, action) => {
      state.push(action.payload);
    })
    .addCase('REMOVE_CREDENTIAL', (state, action) => {
      return filter((credential, i) => i !== action.payload.index);
    });
});
*/
export const credentialSlice = createSlice({
  name: 'credentials',
  initialState: {
    cred: [
      {
        id: Math.random().toString(),
        proof: 'førerkort-klasse-B',
        issuer: 'Statens Vegvesen',
        issuedDate: '20.02.21',
        expiryDate: '20.02.24',
        verifiers: ['ei teneste', 'ei anna teneste'],
      },
      {
        id: Math.random().toString(),
        proof: 'er-sykepleier',
        issuer: 'NTNU',
        issuedDate: '20.02.21',
        expiryDate: '20.02.24',
        verifiers: ['ei anna tenesteee', 'ei annaaaa teneste'],
      },
    ],
  },
  reducers: {
    addCredential: (state, action) => {
      state.cred.push(action.payload);
    },
    removeCredential: (state, action) => {
      state.cred.splice(
        state.cred.findIndex((item) => item.id == action.payload),
        1
      );
    },
  },
});

const { actions, reducer } = credentialSlice;

export const { addCredential, removeCredential } = actions;

export default reducer;
