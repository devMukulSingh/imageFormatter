import { IinitialState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IinitialState = {
  base64Images: [],
  loading: false,
  passportSizeBase64Images: [],
};

export const slice = createSlice({
  name: "rootSlice",
  initialState,
  reducers: {
    removeAllPassportSizeImages: (state) => {
      state.passportSizeBase64Images = [];
    },
    setPassportSizeBase64Image: (state, action) => {
      state.passportSizeBase64Images = action.payload;
    },
    pushPassportSizeBase64Images: (state, action) => {
      state.passportSizeBase64Images.push(...action.payload);
    },
    setBase64Images: (state, action) => {
      state.base64Images = action.payload;
    },
    removeImage: (state, action) => {
      const filteredArr = state.base64Images.filter(
        (img) => img.id !== action.payload,
      );
      state.base64Images = filteredArr;
    },
    pushBase64Images: (state, action) => {
      state.base64Images.push(...action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    removeAllImages: (state) => {
      state.base64Images = [];
    },
    removePassportSizeImage: (state, action) => {
      const filteredArr = state.passportSizeBase64Images.filter(
        (img) => img.id !== action.payload,
      );
      state.passportSizeBase64Images = filteredArr;
    },
  },
});

export default slice.reducer;

export const {
  setBase64Images,
  removeImage,
  pushBase64Images,
  setLoading,
  pushPassportSizeBase64Images,
  setPassportSizeBase64Image,
  removeAllImages,
  removeAllPassportSizeImages,
  removePassportSizeImage,
} = slice.actions;
