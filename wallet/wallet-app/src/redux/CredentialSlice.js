import { createSlice } from '@reduxjs/toolkit';

export const credentialSlice = createSlice({
    name: 'credentials',
    initialState: {
        cred: [],
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
