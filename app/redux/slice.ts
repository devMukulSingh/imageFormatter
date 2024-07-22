import { IinitialState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IinitialState = {
  base64Images: [],
  loading: false,
  passportSizeBase64Images: [],
  aadharPdfs: [],
  collageFiles: "",
  passportPhotoFiles: "",
  base64Pan: "",
};

export const slice = createSlice({
  name: "rootSlice",
  initialState,
  reducers: {
    removeAllPassportSizeImages: (state) => {
      state.passportSizeBase64Images = [];
      state.passportPhotoFiles = "";
    },
    setCollageFiles: (state, action) => {
      state.collageFiles = action.payload;
    },
    setPassportPhotoFiles: (state, action) => {
      state.passportPhotoFiles = action.payload;
    },
    setPassportSizeBase64Image: (state, action) => {
      state.passportSizeBase64Images = action.payload;
    },
    pushBase64Pdfs: (state, action) => {
      state.aadharPdfs.push(action.payload);
    },
    setBase64Pdf: (state, action) => {
      state.aadharPdfs = action.payload;
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
      state.collageFiles = "";
    },
    removePassportSizeImage: (state, action) => {
      const filteredArr = state.passportSizeBase64Images.filter(
        (img) => img.id !== action.payload,
      );
      state.passportSizeBase64Images = filteredArr;
    },
    removeAadharPdf: (state, action) => {
      const filteredArr = state.aadharPdfs.filter(
        (pdf) => pdf.id !== action.payload,
      );
      state.aadharPdfs = filteredArr;
    },
    setBase64Pan: (state, action) => {
      state.base64Pan = action.payload;
    },
    removeBase64Pan: (state, action) => {
      state.base64Pan = "";
    },
    setCroppedImg: (state, action) => {
      const { img, id } = action.payload;
      for (let i = 0; i < state.base64Images.length; i++) {
        if (state.base64Images[i].id === id) {
          state.base64Images[i].img = img;
          return;
        }
      }
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
  setBase64Pdf,
  removeAadharPdf,
  pushBase64Pdfs,
  setCollageFiles,
  setPassportPhotoFiles,
  setBase64Pan,
  removeBase64Pan,
  setCroppedImg,
} = slice.actions;
