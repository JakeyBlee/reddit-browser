import { configureStore } from "@reduxjs/toolkit";
import postFilterSliceReducer from "../features/postFilter/postFilterSlice";
import subRedditFilterReducer from "../features/subRedditFilter/subRedditFilterSlice";

export const store = configureStore({
    reducer:{
        filterResults: postFilterSliceReducer,
        subRedditFilter: subRedditFilterReducer
    }
})