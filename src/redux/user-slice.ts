import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export const USERS_KEY = 'users';

export type UsersState = {
    status: 'pending' | 'idle';
    users: User[];
}

export type User = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: UserAddress
}

export type UserAddress = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: LatLng
};

export type LatLng = { lat: string, lng: string };

export const userSlice = createSlice(
    {
        name: USERS_KEY,
        initialState: {
            status: 'idle',
            users: []
        } as UsersState,
        reducers: {
            saveUsers: (state, action: PayloadAction<User[]>) => ({
                ...state,
                users: [ ...action.payload ]
            })
        },
        extraReducers: (builder) => {
            builder.addCase(fetchUsers.pending, (state) => ({
                ...state,
                status: 'pending'
            }));

            builder.addCase(fetchUsers.fulfilled, (state, { payload }) => ({
                users: [ ...payload ],
                status: 'idle'
            }));

            builder.addCase(fetchUsers.rejected, () => ({
                users: [],
                status: 'idle'
            }));
        }
    }
);

export const { saveUsers } = userSlice.actions;

export const fetchUsers = createAsyncThunk<User[]>(
    'users/fetch',
    async () => {
        // Fetch the backend endpoint:
        const response = await fetch(`${process.env['REACT_APP_API_BASE_URL ']}/users`);

        // Get the JSON from the response:
        const data: User[] = await response.json();

        // Return result:
        return data;
    }
);

export const usersSelector = (state: RootState) => state.users.users;