import { createSlice } from '@reduxjs/toolkit';

export const SpinnerSlice = createSlice({
    name: 'spinnerStatus',
    initialState: { active: false },
    reducers: {
        activateSpinner: (state, action) => ({ ...state, active: action.payload }),
        deactivateSpinner: (state, action) => ({ ...state, active: action.payload }),
    },
});

const { actions, reducer } = SpinnerSlice;

export const { activateSpinner, deactivateSpinner } = actions;

export default reducer;
