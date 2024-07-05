import { IinitialState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState:IinitialState = {
    base64Images : [],
}

export const slice = createSlice({
    name:'rootSlice',
    initialState,
    reducers:{
        setBase64Images : (state,action ) => {
            state.base64Images = action.payload;
        }
    }
});


export default slice.reducer;

export const { setBase64Images } = slice.actions;

