import { createSlice } from '@reduxjs/toolkit';

export const SignedInSlice = createSlice({
    name: 'signedInStatus',
    initialState: { signedIn: true },
    reducers: {
        signIn: (state, action) => ({ ...state, signedIn: action.payload }),
        signOut: (state, action) => ({ ...state, signedIn: action.payload }),
    },
});

const { actions, reducer } = SignedInSlice;

export const { signIn, signOut } = actions;

export default reducer;
