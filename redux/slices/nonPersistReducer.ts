import { InonPersistInitialState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: InonPersistInitialState = {
  loading: false,
};

export const nonPersistSlice = createSlice({
  name: "nonPersistSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setLoading
} = nonPersistSlice.actions;

export default nonPersistSlice.reducer;
