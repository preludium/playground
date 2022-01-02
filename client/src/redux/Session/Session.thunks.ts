import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '@redux/store';
import axios from '@utils/axios';
import { User } from '@utils/types';

import { SessionState } from './Session.state';

export const getCurrentAccountDataIfNeeded
    = createAsyncThunk<User, void, { state: RootState }>(
        'session/getCurrentAccountDataIfNeeded',
        async () => {
            const response = await axios
                .get<User>('/api/users-current');
            return response.data;
        },
        {
            condition: (_, api) => {
                const { session } = api.getState();
                return !session.user;
            },
        },
    );

export const buildSessionExtraReducers = (builder: ActionReducerMapBuilder<SessionState>) => {
    builder
        .addCase(getCurrentAccountDataIfNeeded.fulfilled, (state, action) => {
            state.user = action.payload;
        });
};
