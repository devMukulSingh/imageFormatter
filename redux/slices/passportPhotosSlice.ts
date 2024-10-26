import { IPassportSizeImages } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit'

const initialState: IPassportSizeImages = {
    passportSizePhotos: [],
    passportPhotoFiles: '',
    passportInputRef: null,
    passportPhotoIndexes: [
        {
            imageId: null,
            textboxLocation: null,
        },
    ],
}

const passportPhotosSlice = createSlice({
    name: 'passportPhotoSlice',
    initialState,
    reducers: {

        removeSelectedImageIndex: (state, action) => {
            const filteredArray = state.passportPhotoIndexes?.filter(
                (item) => item.imageId !== action.payload,
            );
            state.passportPhotoIndexes = filteredArray || [];
        },
        pushSelectedImageIndex: (state, action) => {
            const { imageId, textboxLocation } = action.payload;
            for (let i = 0; i < state.passportPhotoIndexes.length; i++) {
                if (state.passportPhotoIndexes[i].imageId === imageId) {
                    state.passportPhotoIndexes[i].textboxLocation = textboxLocation;
                    return;
                }
            }
            state.passportPhotoIndexes.push(action.payload);
        },
        setPassportInputRef: (state, action) => {
            state.passportInputRef = action.payload;
        },
        setPassportPhotoFiles: (state, action) => {
            state.passportPhotoFiles = action.payload;
        },
        setPassportSizePhotos: (state, action) => {
            state.passportSizePhotos = action.payload;
        },
        pushPassportSizeImages: (state, action) => {
            state.passportSizePhotos.push(...action.payload);
        },

        removePassportSizePhoto: (state, action) => {
            const filteredArr = state.passportSizePhotos.filter(
                (img) => img.id !== action.payload,
            );
            state.passportSizePhotos = filteredArr;
        },
        removeAllPassportSizePhotos: (state) => {
            state.passportSizePhotos = [];
            state.passportPhotoFiles = "";
        },
        setPhotoTextbox: (state, action) => {
            const { imageId, textboxLocation } = action.payload;
            for (let i = 0; i < state.passportSizePhotos.length; i++) {
                if (state.passportSizePhotos[i].id === imageId) {
                    state.passportSizePhotos[i].textbox = {
                        isActive: true,
                        location: textboxLocation,
                    };
                    return;
                }
            }
        },
        removePhotoTextbox: (state, action) => {
            for (let i = 0; i < state.passportSizePhotos.length; i++) {
                if (state.passportSizePhotos[i].id === action.payload) {
                    state.passportSizePhotos[i].textbox = {
                        isActive: false,
                        location: null,
                    };
                    return;
                }
            }
        },
    }
});

export const { pushPassportSizeImages,
    removePhotoTextbox,
    setPhotoTextbox,
    setPassportSizePhotos,
    removeAllPassportSizePhotos,
    removePassportSizePhoto,setPassportInputRef } = passportPhotosSlice.actions

export default passportPhotosSlice.reducer