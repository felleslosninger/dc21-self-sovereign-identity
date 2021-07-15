import { createSlice } from '@reduxjs/toolkit';

export const CredentialShareSlice = createSlice({
    name: 'credentialShares',
    initialState: {
        shared: [],
    },
    reducers: {
        addCredentialShare: (state, action) => {
            state.shared.push(action.payload);
        },
        removeCredentialShare: (state, action) => {
            state.splice(
                state.shared.findIndex((item) => item.id === action.payload),
                1
            );
        },
    },
});

const { actions, reducer } = CredentialShareSlice;

export const { addCredentialShare, removeCredentialShare } = actions;

export default reducer;
