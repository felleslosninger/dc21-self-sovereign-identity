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
        id: Math.floor(Math.random() * 1000),
        proof: 'førerkort-klasse-B',
      },
      {
        id: Math.floor(Math.random() * 1000),
        proof: 'er-sykepleier',
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
