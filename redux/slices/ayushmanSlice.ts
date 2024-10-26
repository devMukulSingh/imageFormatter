import { IAyushmanInitialState } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit'

const initialState:IAyushmanInitialState = {
    ayushmanPdfs: [],
    ayushmanInputRef:null
}

const ayushmanSlice = createSlice({
  name: 'ayushmanSlice',
  initialState,
  reducers: {
      setAyushmanInputRef: (state, action) => {
          state.ayushmanInputRef = action.payload;
      },
      pushAyushmanPdfs: (state, action) => {
          state.ayushmanPdfs.push(action.payload);
      },
      removeAllAyushmanPdfs: (state) => {
          state.ayushmanPdfs = [];
      },
      setAyushmanImgUrl: (state, action) => {
          const { id, imgUrl } = action.payload;
          for (let i = 0; i < state.ayushmanPdfs.length; i++) {
              if (state.ayushmanPdfs[i].id === id) {
                  state.ayushmanPdfs[i].imgUrl = imgUrl;
                  return;
              }
          }
      },
      removeAyushmanPdf: (state, action) => {
          const filteredArr = state.ayushmanPdfs.filter(
              (pdf) => pdf.id !== action.payload,
          );
          state.ayushmanPdfs = filteredArr;
      },
  }
});

export const {
    pushAyushmanPdfs,
    removeAllAyushmanPdfs,
    setAyushmanImgUrl,
    removeAyushmanPdf,
    setAyushmanInputRef
} = ayushmanSlice.actions

export default ayushmanSlice.reducer