import { IPanInitialState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit"


const initialState: IPanInitialState = {
    panCardImages: [],
    panInputRef:null
}

const panSlice = createSlice({
    initialState,
    name: 'panSlice',
    reducers: {

        setPanInputRef: (state, action) => {
            state.panInputRef = action.payload;
        },
        setEditedPan: (state, action) => {
            const { img, id } = action.payload;
            for (let i = 0; i < state.panCardImages.length; i++) {
                if (state.panCardImages[i].id === id) {
                    state.panCardImages[i].img = img;
                    return;
                }
            }
        },
        setBase64Pan: (state, action) => {
            state.panCardImages = action.payload;
        },

        removeBase64Pan: (state, action) => {
            const filteredArr = state.panCardImages.filter(
                (img) => img.id !== action.payload,
            );
            state.panCardImages = filteredArr;
        },
        setPanContrast: (state, action) => {
            const { id, value } = action.payload;

            for (let i = 0; i < state.panCardImages.length; i++) {
                if (state.panCardImages[i].id === id) {
                    state.panCardImages[i].filters.contrast = value;
                    return;
                }
            }
        },
        setPanRotation: (state, action) => {
            const { id, value } = action.payload;
            for (let i = 0; i < state.panCardImages.length; i++) {
                if (state.panCardImages[i].id === id) {
                    state.panCardImages[i].filters.rotation = value;
                    return;
                }
            }
        },
        setPanSaturation: (state, action) => {
            const { id, value } = action.payload;
            for (let i = 0; i < state.panCardImages.length; i++) {
                if (state.panCardImages[i].id === id) {
                    state.panCardImages[i].filters.saturation = value;
                    return;
                }
            }
        },
        setPanBrightness: (state, action) => {
            const { id, value } = action.payload;
            for (let i = 0; i < state.panCardImages.length; i++) {
                if (state.panCardImages[i].id === id) {
                    state.panCardImages[i].filters.brightness = value;
                    return;
                }
            }
        },
    }
})

export default panSlice.reducer;

export const { setPanBrightness,
    setPanContrast,
    setPanRotation,
    setPanSaturation, setEditedPan,removeBase64Pan,setBase64Pan,setPanInputRef} = panSlice.actions;