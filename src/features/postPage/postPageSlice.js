import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPostData = createAsyncThunk(
    'postPage/fetchPostData',
    async (postUrl) => {
        const response = await fetch(`https://www.reddit.com${postUrl}.json`);
        const jsonResponse = await response.json();
        return jsonResponse;
    }
)

const options = {
    name: 'postPage',
    initialState: {
        postData: {},
        commentData: {},
        isLoading: false,
        isError: false,
    },
    reducers: {
    },
    extraReducers: {
        [fetchPostData.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [fetchPostData.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
        },
        [fetchPostData.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.postData = action.payload[0].data.children[0].data;
            state.commentData = action.payload[1].data.children;
        }
    }
};

const postPageSlice = createSlice(options);

export const selectPostPage = (state) => state.postPage;
export default postPageSlice.reducer;