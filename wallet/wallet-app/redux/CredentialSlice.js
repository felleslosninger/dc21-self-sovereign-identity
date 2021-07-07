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
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiaXNzIjoiTlROVSIsImV4cCI6MTcxODQ0NTYwMCwiaWF0IjoxNjIzNzUxMjAwLCJ2YyI6ImVyLXN5a2VwbGVpZXIiLCJqdGkiOiJyYW5kb21JRC1zeWtlcGxlaWVyIn0.Yieg4SAjR2rzFaQf8I77f6qOlRnCTxbMCa93k5t0tNo',
            },
            {
                sub: 'testSub',
                iss: 'Statens Vegvesen',
                exp: 1844244000,
                iat: 1528624800,
                vc: 'førerkort-klasse-b',
                jti: 'randomID-førerkort',
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiaXNzIjoiU3RhdGVucyBWZWd2ZXNlbiIsImV4cCI6MTg0NDI0NDAwMCwiaWF0IjoxNTI4NjI0ODAwLCJ2YyI6ImbDuHJlcmtvcnQta2xhc3NlLWIiLCJqdGkiOiJyYW5kb21JRC1mw7hyZXJrb3J0In0.GkHFGIGlimTFmDz9uI8KYXW2B_EEILwxID0EL8hBLJk',
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
