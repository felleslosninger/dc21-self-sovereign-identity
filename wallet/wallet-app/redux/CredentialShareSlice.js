import { createSlice } from '@reduxjs/toolkit';

export const CredentialShareSlice = createSlice({
    name: 'credentialShares',
    initialState: {
        shared: [
            {
                id: Math.random().toString(),
                credential_id: 'randomID-sykepleier',
                // shared_date: Date.now().toString(),
                // expiry_date: new Date().setDate(new Date().getDate() + 14),
                verifier: 'ei anna tenesteee',
            },
        ],
    },
    reducers: {
        addCredentialShare: (state, action) => {
            state.push(action.payload);
        },
        removeCredentialShare: (state, action) => {
            state.splice(
                state.findIndex((item) => item.id === action.payload),
                1
            );
        },
    },
});

const { actions, reducer } = CredentialShareSlice;

export const { addCredentialShare, removeCredentialShare } = actions;

export default reducer;
