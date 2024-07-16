import { IinitialState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IinitialState = {
  base64Images: [],
  loading:false,
};

export const slice = createSlice({
  name: "rootSlice",
  initialState,
  reducers: {
    setBase64Images: (state, action) => {
      state.base64Images = action.payload;
    },
    removeImage: (state, action) => {
      const filteredArr = state.base64Images.filter(
        (img) => img.id !== action.payload,
      );
      state.base64Images = filteredArr;
    },
    pushBase64Images : (state,action) => {
      state.base64Images.push(...action.payload)
    },
    setLoading : (state,action) => {
      state.loading = action.payload;
    },
    removeAllImages : (state) => {
      state.base64Images = [];
    }
  },
});

export default slice.reducer;

export const { setBase64Images, removeImage, pushBase64Images, setLoading, removeAllImages } = slice.actions;
