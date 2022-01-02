import { configureStore } from '@reduxjs/toolkit';

import { sessionReducer } from './Session';

const store = configureStore({
    reducer: {
        session: sessionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
