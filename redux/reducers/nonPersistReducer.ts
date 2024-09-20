import { InonPersistInitialState } from "@/lib/types";
import { Item } from "@radix-ui/react-dropdown-menu";
import { createSlice } from "@reduxjs/toolkit";

const initialState: InonPersistInitialState = {
  collageInputRef: null,
  passportInputRef: null,
  panInputRef: null,
  aadharInputRef: null,
  ayushmanInputRef: null,
  loading: false,
  passportPhotoIndexes:[]
};

export const nonPersistSlice = createSlice({
  name: "nonPersistSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCollageInputRef: (state, action) => {
      state.collageInputRef = action.payload;
    },
    setPassportInputRef: (state, action) => {
      state.passportInputRef = action.payload;
    },
    setPanInputRef: (state, action) => {
      state.panInputRef = action.payload;
    },
    setAadharInputRef: (state, action) => {
      state.aadharInputRef = action.payload;
    },
    setAyushmanInputRef: (state, action) => {
      state.ayushmanInputRef = action.payload;
    },
    pushSelectedImageIndex : (state,action) => {
      state.passportPhotoIndexes?.push(action.payload); 
    },
    removeSelectedImageIndex: (state, action) => {
     const filteredArray = state.passportPhotoIndexes?.filter( item => item!==action.payload);
     state.passportPhotoIndexes = filteredArray || [];
    }
  },
});

export const {
  setCollageInputRef,
  setPanInputRef,
  setPassportInputRef,
  setLoading,
  setAadharInputRef,
  setAyushmanInputRef,
  pushSelectedImageIndex,
  removeSelectedImageIndex
} = nonPersistSlice.actions;

export default nonPersistSlice.reducer;
