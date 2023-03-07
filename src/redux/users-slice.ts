import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export const USERS_KEY = 'users';

export type UsersState = {
    status: 'pending' | 'idle' | 'error';
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

export const usersSlice = createSlice(
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
                status: 'error'
            }));
        }
    }
);

export const { saveUsers } = usersSlice.actions;

export const fetchUsers = createAsyncThunk<User[]>(
    'users/fetch',
    async () => {
        // Fetch the backend endpoint:
        const fetchWithDelay: Promise<Response> = new Promise((resolve) => {
            // dummyTimeout to fake long loading
            setTimeout(() => {
                fetch(`${process.env['REACT_APP_API_BASE_URL']}/users`).then(result => resolve(result));
            }, 2000);
        });
        const response = await fetchWithDelay;

        if(response.status >= 400) {
            console.error('Something went wrong during api request', response.status);
            throw Error('error.network');
        }

        // Get the JSON from the response:
        const data: User[] = await response.json();

        // Return result:
        return data;
    }
);

export const usersSelector = (state: RootState) => state.users.users;
export const usersStoreStatusSelector = (state: RootState) => state.users.status;
export const userSelector = createSelector([
    (state: RootState) => state.users.users,
    (state, userId: number | undefined) => userId
],
(users, userId) => users.find(it => it.id === userId));