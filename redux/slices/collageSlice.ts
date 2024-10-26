import { ICollageInitialState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";


const initialState: ICollageInitialState = {
    collageImages: [],
    collageFiles: "",
    collageInputRef:null
}

const collageSlice = createSlice({
    initialState,
    name: 'collageSlice',
    reducers: {
        // setCollageImageById: (state, action) => {
        //     const { id, src } = action.payload;
        //     for (let i = 0; i < state.collageFiles.length; i++) {
        //         if (state.collageFiles[i].id === id) {
        //             state.collageFiles[i].src = src;
        //             return;
        //         }
        //     }
        // },
        setCollageInputRef: (state, action) => {
            state.collageInputRef = action.payload;
        },
        setCollageFiles: (state, action) => {
            state.collageFiles = action.payload;
        },
        setBrightness: (state, action) => {
            const { id, value } = action.payload;
            for (let i = 0; i < state.collageImages.length; i++) {
                if (state.collageImages[i].id === id) {
                    state.collageImages[i].filters.brightness = value;
                    return;
                }
            }
        },
        setContrast: (state, action) => {
            const { id, value } = action.payload;

            for (let i = 0; i < state.collageImages.length; i++) {
                if (state.collageImages[i].id === id) {
                    state.collageImages[i].filters.contrast = value;
                    return;
                }
            }
        },
        setRotation: (state, action) => {
            const { id, value } = action.payload;
            for (let i = 0; i < state.collageImages.length; i++) {
                if (state.collageImages[i].id === id) {
                    state.collageImages[i].filters.rotation = value;
                    return;
                }
            }
        },
        setSaturation: (state, action) => {
            const { id, value } = action.payload;
            for (let i = 0; i < state.collageImages.length; i++) {
                if (state.collageImages[i].id === id) {
                    state.collageImages[i].filters.saturation = value;
                    return;
                }
            }
        },
        removeImage: (state, action) => {
            const filteredArr = state.collageImages.filter(
                (img) => img.id !== action.payload,
            );
            state.collageImages = filteredArr;
        }, setcollageImages: (state, action) => {
            state.collageImages = action.payload;
        },
        pushcollageImages: (state, action) => {
            state.collageImages.push(...action.payload);
        },
        removeAllImages: (state) => {
            state.collageImages = [];
            state.collageFiles = "";
        },
        setCroppedImg: (state, action) => {
            const { img, id } = action.payload;
            for (let i = 0; i < state.collageImages.length; i++) {
                if (state.collageImages[i].id === id) {
                    state.collageImages[i].img = img;
                    return;
                }
            }
        },
    }
})


export default collageSlice.reducer;

export const { setBrightness,
    setContrast,
    setRotation,
    setSaturation,
    setcollageImages,
    removeImage,
    removeAllImages,
    pushcollageImages,
    setCollageFiles,
    setCollageInputRef,
    setCroppedImg, } = collageSlice.actions;