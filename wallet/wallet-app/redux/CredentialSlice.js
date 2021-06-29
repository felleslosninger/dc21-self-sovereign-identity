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
        id: 0,
        proof: 'førerkort-klasse-B',
      },
      {
        id: 1,
        proof: 'er-sykepleier',
      },
    ],
  },
  reducers: {
    addCredential: (state) => {
      state.cred.push({ id: 2, proof: 'over-18' });
    },
    removeCredential: (state, action) => {
      console.log(action.payload.id);
      state.cred.filter((item) => {
        console.log(item);
        item.id !== action.payload;
      });
    },
  },
});

const { actions, reducer } = credentialSlice;

export const { addCredential, removeCredential } = actions;

export default credentialSlice.reducer;
