import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export const POSTS_KEY = 'users';

export type PostsState = {
    status: 'idle' | 'pending';
    currentUserId: number | undefined;
    posts: Post[]
}

export type Post = {
    id: number,
    userId: number,
    title: string,
    body: string
};

export const postsSlice = createSlice(
    {
        name: POSTS_KEY,
        initialState: {
            status: 'idle',
            currentUserId: undefined,
            posts: []
        } as PostsState,
        reducers: {
            savePosts: (state, action: PayloadAction<Post[]>) => ({
                ...state,
                posts: [ ...action.payload ]
            })
        },
        extraReducers: (builder) => {
            builder.addCase(fetchPosts.pending, (state) => ({
                ...state,
                status: 'pending'
            }));

            builder.addCase(fetchPosts.fulfilled, (state, { payload }) => ({
                posts: [ ...payload.posts ],
                currentUserId: payload.userId,
                status: 'idle'
            }));

            builder.addCase(fetchPosts.rejected, () => ({
                posts: [],
                currentUserId: undefined,
                status: 'idle'
            }));
        }
    }
);

export const { savePosts } = postsSlice.actions;

export const fetchPosts = createAsyncThunk<{ posts: Post[], userId: number }, number>(
    'posts/fetch',
    async (userId: number) => {
        // Fetch the backend endpoint:
        const response = await fetch(`${process.env['REACT_APP_API_BASE_URL']}/users/${userId}/posts`);

        // Get the JSON from the response:
        const data: Post[] = await response.json();

        // Return result:
        return {
            posts: data,
            userId
        };
    }
);

export const postsSelector = (state: RootState) => state.posts.posts;
export const postsStateStatusSelector = (state: RootState) => state.posts.status;