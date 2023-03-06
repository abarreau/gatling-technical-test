import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './users-slice';
import thunkMiddleware from 'redux-thunk';

export const STORE_KEY = 'storeState';

export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
    },
    middleware: [ thunkMiddleware ]
});

store.subscribe(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;