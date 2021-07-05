import { createSlice } from '@reduxjs/toolkit';

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
                sub: 'testSub',
                iss: 'NTNU',
                exp: 1718445600,
                iat: 1623751200,
                vc: 'er-sykepleier',
                jti: 'randomID-sykepleier',
            },
            {
                sub: 'testSub',
                iss: 'Statens Vegvesen',
                exp: 1844244000,
                iat: 1528624800,
                vc: 'førerkort-klasse-b',
                jti: 'randomID-førerkort',
            },
        ],
    },
    reducers: {
        addCredential: (state, action) => {
            state.cred.push(action.payload);
        },
        removeCredential: (state, action) => {
            state.cred.splice(
                state.cred.findIndex((item) => item.id === action.payload),
                1
            );
        },
    },
});

const { actions, reducer } = credentialSlice;

export const { addCredential, removeCredential } = actions;

export default reducer;
