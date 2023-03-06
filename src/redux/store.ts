import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user-slice';
import thunkMiddleware from 'redux-thunk';

export const STORE_KEY = 'storeState';

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
    },
    middleware: [ thunkMiddleware ]
});

store.subscribe(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;