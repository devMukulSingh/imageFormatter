import { IinitialState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IinitialState = {
  collageInputRef: null,
  passportInputRef: null,
  panInputRef: null,
  base64Images: [],
  loading: false,
  passportSizeBase64Images: [],
  aadharPdfs: [],
  collageFiles: "",
  passportPhotoFiles: "",
  base64Pan: [],
  filters: {
    brightness: 1,
    contrast: 100,
    saturation: 100,
    rotation: 0,
  },
};

export const slice = createSlice({
  name: "rootSlice",
  initialState,
  reducers: {
    setCollageInputRef: (state, action) => {
      state.collageInputRef = action.payload
    },
    setPassportInputRef: (state, action) => {
      state.passportInputRef = action.payload
    },
    setPanInputRef: (state, action) => {
      state.panInputRef = action.payload
    },
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
      const filteredArr = state.base64Pan.filter(
        (img) => img.id !== action.payload,
      );
      state.base64Pan = filteredArr;
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

    setEditedPan: (state, action) => {
      const { img, id } = action.payload;
      for (let i = 0; i < state.base64Pan.length; i++) {
        if (state.base64Pan[i].id === id) {
          state.base64Pan[i].img = img;
          return;
        }
      }
    },
  },
});

export default slice.reducer;

export const {
  setCollageInputRef,
  setPanInputRef,
  setPassportInputRef,
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

  setEditedPan,
} = slice.actions;
