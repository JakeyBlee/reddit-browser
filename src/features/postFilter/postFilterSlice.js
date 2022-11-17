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

const options = {
    name: 'postFilter',
    initialState: {
        posts: {},
        isLoading: false,
        isError: false,
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
            state.isLoading = true;
            state.isError = false;
        },
        [fetchPostsByFilter.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
        },
        [fetchPostsByFilter.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.posts = action.payload.data.children;
        }
    }
};

const postFilterSlice = createSlice(options);

export const selectFilterResults = (state) => state.filterResults;
export const { setActiveFilter, setTopFilter } = postFilterSlice.actions;
export default postFilterSlice.reducer;