import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@redux/store';

import { SessionState } from './Session.state';
import {
    buildSessionExtraReducers,
    getCurrentAccountDataIfNeeded,
} from './Session.thunks';

const initSessionState: SessionState = {
    user: null,
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState: initSessionState,
    reducers: {
        clearSession: (state) => {
            state.user = null;
        },
    },
    extraReducers: buildSessionExtraReducers,
});

export const sessionActions = {
    ...sessionSlice.actions,
    getCurrentAccountDataIfNeeded,
};

export const sessionReducer = sessionSlice.reducer;

export const sessionSelector = (state: RootState) => state.session;
