// have to do this and next file(store.js) first. 
// But just in case find out about redux and start
import {createSlice} from "@reduxjs/toolkit"


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const {setUser} = userSlice.actions;