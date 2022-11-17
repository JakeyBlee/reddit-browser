import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubRedditInfo = createAsyncThunk(
    'subRedditFilter/fetchSubRedditInfo',
    async (subReddit) => {
        const response = await fetch(`https://www.reddit.com/${subReddit}/about.json`);
        const jsonResponse = await response.json();
        return jsonResponse;
    }
)

export const subRedditSearch = createAsyncThunk(
    'subRedditFilter/subRedditSearch',
    async (searchTerm) => {
        if(!searchTerm){
            return [];
        }
        const response = await fetch(`https://www.reddit.com/subreddits/search.json?q=${searchTerm}`);
        const jsonResponse = await response.json();
        let listLength = 5;
        if(jsonResponse.data.children.length < 5){
            listLength = jsonResponse.data.children.length;
        }
        let searchResults = [];
        for(let i = 0; i < listLength; i++) {
            searchResults.push({
                    id: jsonResponse.data.children[i].data.name,
                    name: jsonResponse.data.children[i].data.display_name_prefixed,
                    thumbnail: jsonResponse.data.children[i].data.icon_img,
                });
        };
        return searchResults;
    }
)

const options = {
    name: 'subRedditFilter',
    initialState: {
        activeSubReddit: 'r/All',
        activeSubRedditInfo: {},
        savedSubReddits: [{
            id:"t5_2qh33",
            name:"r/funny",
            thumbnail:"https://a.thumbs.redditmedia.com/kIpBoUR8zJLMQlF8azhN-kSBsjVUidHjvZNLuHDONm8.png"
        },{
            id:"t5_2qh1i",
            name:"r/AskReddit",
            thumbnail:"https://b.thumbs.redditmedia.com/EndDxMGB-FTZ2MGtjepQ06cQEkZw_YQAsOUudpb9nSQ.png"
        },{
            id:"t5_2qh03",
            name:"r/gaming",
            thumbnail:"https://b.thumbs.redditmedia.com/0PgZl68jAxA6T1BH6uvUQ5Bz1F1GrrJLCL8oi2Gz0Ak.png"
        },{
            id:"t5_2qh0u",
            name:"r/pics",
            thumbnail:"https://b.thumbs.redditmedia.com/VZX_KQLnI1DPhlEZ07bIcLzwR1Win808RIt7zm49VIQ.png"
        },{
            id:"t5_2sbq3",
            name:"r/EarthPorn",
            thumbnail:"https://a.thumbs.redditmedia.com/4Au-rWJ7rUqSTMN09zEXEdpicCS4lnNynf-NXrTxm88.png"
        }],
        searchResults: [],
        listIsLoading: false,
        ListIsError: false,
        InfoIsLoading: false,
        InfoIsError: false
    },
    reducers: {
        setActiveSubReddit: (state, action) => {
            state.activeSubReddit = action.payload;
        },
        addSavedSubReddit: (state, action) => {
            if(!state.savedSubReddits.some(subReddit => subReddit.id === action.payload.id)){
                state.savedSubReddits.push(action.payload);
            }
        },
        removeSavedSubReddit: (state, action) => {
            state.savedSubReddits = state.savedSubReddits.filter(subReddit => subReddit.id !== action.payload);
        }
    },
    extraReducers: {
        [fetchSubRedditInfo.pending]: (state, action) => {
            state.InfoIsLoading = true;
            state.InfoIsError = false;
        },
        [fetchSubRedditInfo.rejected]: (state, action) => {
            state.InfoIsLoading = false;
            state.InfoIsError = true;
        },
        [fetchSubRedditInfo.fulfilled]: (state, action) => {
            state.InfoIsLoading = false;
            state.InfoIsError = false;
            state.activeSubRedditInfo = action.payload;
        },
        [subRedditSearch.pending]: (state, action) => {
            state.ListIsLoading = true;
            state.ListIsError = false;
        },
        [subRedditSearch.rejected]: (state, action) => {
            state.ListIsLoading = false;
            state.ListIsError = true;
        },
        [subRedditSearch.fulfilled]: (state, action) => {
            state.ListIsLoading = false;
            state.ListIsError = false;
            state.searchResults = action.payload;
        }
    }
};

const subRedditFilterSlice = createSlice(options);

export const selectSubRedditFilter = (state) => state.subRedditFilter;
export const { setActiveSubReddit, addSavedSubReddit, removeSavedSubReddit } = subRedditFilterSlice.actions;
export default subRedditFilterSlice.reducer;