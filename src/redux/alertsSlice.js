// have to do this and next file(store.js) first. 
// But just in case find out about redux and start
import {createSlice} from "@reduxjs/toolkit"

export const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        
        loading: false,
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        },
    },
});

export const {showLoading, hideLoading} = alertSlice.actions;