import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPostsByFilter = createAsyncThunk(
    'postFilter/fetchPostsByFilter',
    async ([filterTerm, subReddit, topFilter]) => {
        const baseUrl = 'https://www.reddit.com/';
        let response;
        if(filterTerm === 'Hot' || filterTerm === 'New'){
            response = await fetch(`${baseUrl}${subReddit}/${filterTerm.toLowerCase()}.json`);
        } else if(filterTerm === 'Top'){
            response = await fetch(`${baseUrl}${subReddit}/${filterTerm.toLowerCase()}.json?t=${topFilter}`);
        } else {
            response = await fetch(`https://www.reddit.com/search.json?q=${filterTerm}`);
        }
        const jsonResponse = await response.json();
        return jsonResponse;
    }
)

export const fetchAdditionalPosts = createAsyncThunk(
    'postFilter/fetchAdditionalPosts',
    async ([filterTerm, subReddit, topFilter, lastPostId]) => {
        const baseUrl = 'https://www.reddit.com/';
        let response;
        if(filterTerm === 'Hot' || filterTerm === 'New'){
            response = await fetch(`${baseUrl}${subReddit}/${filterTerm.toLowerCase()}.json?after=${lastPostId}`);
        } else if(filterTerm === 'Top'){
            response = await fetch(`${baseUrl}${subReddit}/${filterTerm.toLowerCase()}.json?t=${topFilter}?after=${lastPostId}`);
        } else {
            response = await fetch(`https://www.reddit.com/search.json?q=${filterTerm}?after=${lastPostId}`);
        }
        const jsonResponse = await response.json();
        return jsonResponse;
    }
)

const options = {
    name: 'postFilter',
    initialState: {
        posts: {},
        isMainLoading: false,
        isMainError: false,
        isAdditionalLoading: false,
        isAdditionalError: false,
        activeFilter: 'Hot',
        topFilter: 'day'
    },
    reducers: {
        setActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        setTopFilter: (state, action) => {
            state.topFilter = action.payload;
        }
    },
    extraReducers: {
        [fetchPostsByFilter.pending]: (state, action) => {
            state.isMainLoading = true;
            state.isMainError = false;
        },
        [fetchPostsByFilter.rejected]: (state, action) => {
            state.isMainLoading = false;
            state.isMainError = true;
        },
        [fetchPostsByFilter.fulfilled]: (state, action) => {
            state.isMainLoading = false;
            state.isMainError = false;
            state.posts = action.payload.data.children;
        },
        [fetchAdditionalPosts.pending]: (state, action) => {
            state.isAdditionalLoading = true;
            state.isAdditionalError = false;
        },
        [fetchAdditionalPosts.rejected]: (state, action) => {
            state.isAdditionalLoading = false;
            state.isAdditionalError = true;
        },
        [fetchAdditionalPosts.fulfilled]: (state, action) => {
            state.isAdditionalLoading = false;
            state.isAdditionalError = false;
            const newPosts = action.payload.data.children.filter(post => !state.posts.includes(post));
            state.posts = [...state.posts, ...newPosts];
        }
    }
};

const postFilterSlice = createSlice(options);

export const selectFilterResults = (state) => state.filterResults;
export const { setActiveFilter, setTopFilter } = postFilterSlice.actions;
export default postFilterSlice.reducer;