import { IAadharCardInitialstate } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit'

const initialState: IAadharCardInitialstate = {
    aadharPdfs: [],
    aadharCardInputRef:null
}

const aadharCardSlice = createSlice({
    name: 'aadharCardSlice',
    initialState,
    reducers: {
        setAadharCardInputRef: (state, action) => {
            state.aadharCardInputRef = action.payload;
        },
        setAadharImgUrl: (state, action) => {
            const { id, imgUrl } = action.payload;
            for (let i = 0; i < state.aadharPdfs.length; i++) {
                if (state.aadharPdfs[i].id === id) {
                    state.aadharPdfs[i].imgUrl = imgUrl;
                    return;
                }
            }
        },
        pushBase64Pdfs: (state, action) => {
            state.aadharPdfs.push(action.payload);
        },
        setBase64Pdf: (state, action) => {
            state.aadharPdfs = action.payload;
        },
        pushAadharPdfs: (state, action) => {
            state.aadharPdfs.push(action.payload);
        },
        removeAadharPdf: (state, action) => {
            const filteredArr = state.aadharPdfs.filter(
                (pdf) => pdf.id !== action.payload,
            );
            state.aadharPdfs = filteredArr;
        },
        removeAllAadharPdfs: (state) => {
            state.aadharPdfs = [];
        },
    }
});

export const { pushAadharPdfs, pushBase64Pdfs,setAadharCardInputRef, removeAadharPdf, removeAllAadharPdfs, setAadharImgUrl, setBase64Pdf } = aadharCardSlice.actions


export default aadharCardSlice.reducer