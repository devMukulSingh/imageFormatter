import { InonPersistInitialState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: InonPersistInitialState = {
  collageInputRef: null,
  passportInputRef: null,
  panInputRef: null,
  aadharInputRef: null,
  ayushmanInputRef: null,
  loading: false,
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
  },
});

export const {
  setCollageInputRef,
  setPanInputRef,
  setPassportInputRef,
  setLoading,
  setAadharInputRef,
  setAyushmanInputRef
} = nonPersistSlice.actions;

export default nonPersistSlice.reducer;
