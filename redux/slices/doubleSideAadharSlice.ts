import { IDoubleSideAadharInitalState } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit'

const initialState: IDoubleSideAadharInitalState = {
    doubleSideAadharPdfs: [],
    doubleSideAadharInputRef:null
}

const doubleSideAadharSlice = createSlice({
    name: 'doubleSideAadharSlice',
    initialState,
    reducers: {
        setDoubleSideAadharInputRef: (state, action) => {
            state.doubleSideAadharInputRef = action.payload;
        },
        setBackSideAadharImgUrl: (state, action) => {
            const { id, imgUrlBack } = action.payload;
            for (let i = 0; i < state.doubleSideAadharPdfs.length; i++) {
                if (state.doubleSideAadharPdfs[i].id === id) {
                    state.doubleSideAadharPdfs[i].imgUrl.back = imgUrlBack;
                    return;
                }
            }
        },
        pushDoubleSideAadharPdfs: (state, action) => {
            state.doubleSideAadharPdfs.push(action.payload);
        },
        removeDoubleSideAadharPdf: (state, action) => {
            const filteredArr = state.doubleSideAadharPdfs.filter(
                (pdf) => pdf.id !== action.payload,
            );
            state.doubleSideAadharPdfs = filteredArr;
        },
        removeAllDoubleSideAadharPdfs: (state) => {
            state.doubleSideAadharPdfs = [];
        },

        setDoubleSideAadharImgUrl: (state, action) => {
            const { id, imgUrlFront, imgUrlBack } = action.payload;
            for (let i = 0; i < state.doubleSideAadharPdfs.length; i++) {
                if (state.doubleSideAadharPdfs[i].id === id) {
                    state.doubleSideAadharPdfs[i].imgUrl = {
                        back: imgUrlBack,
                        front: imgUrlFront,
                    };
                    return;
                }
            }
        },
    }
});

export const { pushDoubleSideAadharPdfs,setBackSideAadharImgUrl,setDoubleSideAadharInputRef, removeAllDoubleSideAadharPdfs, removeDoubleSideAadharPdf, setDoubleSideAadharImgUrl } = doubleSideAadharSlice.actions

export default doubleSideAadharSlice.reducer