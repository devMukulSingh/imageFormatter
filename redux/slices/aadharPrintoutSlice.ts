import { IAadharPrintoutInitialState } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit'

const initialState: IAadharPrintoutInitialState = {
  aadharPrintoutImages: [],
  aadharPrintoutInputRef: null,
}

const aadharPrintoutSlice = createSlice({
  name: 'aadharPrintoutSlice',
  initialState,
  reducers: {
    setAadharPrintoutInputRef: (state, action) => {
      state.aadharPrintoutInputRef = action.payload;
    },
    setAadharPrintoutCroppedImg: (state, action) => {
      const { img, id } = action.payload;
      for (let i = 0; i < state.aadharPrintoutImages.length; i++) {
        if (state.aadharPrintoutImages[i].id === id) {
          state.aadharPrintoutImages[i].img = img;
          return;
        }
      }
    },
    setAadharPrintoutBrightness: (state, action) => {
      const { id, value } = action.payload;
      for (let i = 0; i < state.aadharPrintoutImages.length; i++) {
        if (state.aadharPrintoutImages[i].id === id) {
          state.aadharPrintoutImages[i].filters.brightness = value;
          return;
        }
      }
    },
    setAadharPrintoutContrast: (state, action) => {
      const { id, value } = action.payload;

      for (let i = 0; i < state.aadharPrintoutImages.length; i++) {
        if (state.aadharPrintoutImages[i].id === id) {
          state.aadharPrintoutImages[i].filters.contrast = value;
          return;
        }
      }
    },
    setAadharPrintoutRotation: (state, action) => {
      const { id, value } = action.payload;
      for (let i = 0; i < state.aadharPrintoutImages.length; i++) {
        if (state.aadharPrintoutImages[i].id === id) {
          state.aadharPrintoutImages[i].filters.rotation = value;
          return;
        }
      }
    },
    setAadharPrintoutSaturation: (state, action) => {
      const { id, value } = action.payload;
      for (let i = 0; i < state.aadharPrintoutImages.length; i++) {
        if (state.aadharPrintoutImages[i].id === id) {
          state.aadharPrintoutImages[i].filters.saturation = value;
          return;
        }
      }
    },

    pushAadharPrintoutImages: (state, action) => {
      state.aadharPrintoutImages.push(...action.payload);
    },
    removeAllAadharPrintoutImages: (state) => {
      state.aadharPrintoutImages = [];
    },
    removeAadharPrintoutImage: (state, action) => {
      const filteredArr = state.aadharPrintoutImages.filter(
        (img) => img.id !== action.payload,
      );
      state.aadharPrintoutImages = filteredArr;
    },
  }
});

export const { pushAadharPrintoutImages,
  removeAadharPrintoutImage,
  removeAllAadharPrintoutImages, setAadharPrintoutBrightness, setAadharPrintoutContrast, setAadharPrintoutCroppedImg, setAadharPrintoutInputRef, setAadharPrintoutRotation, setAadharPrintoutSaturation } = aadharPrintoutSlice.actions

export default aadharPrintoutSlice.reducer