import { combineReducers, configureStore } from "@reduxjs/toolkit";
import nonPersistedReducer from "@/redux/slices/nonPersistReducer";
import collageSlice from './slices/collageSlice';
import panSlice from './slices/panSlice';
import aadharCardSlice from './slices/aadharCardSlice';
import doubleSideAadharSlice from './slices/doubleSideAadharSlice';
import ayushmanSlice from './slices/ayushmanSlice';
import passportPhotoSlice from './slices/passportPhotosSlice';
import aadharPrintoutSlice from './slices/aadharPrintoutSlice';


const combinedReducers = combineReducers({
  nonPersistedReducer,
  collageSlice,
  panSlice,
  aadharCardSlice,
  aadharPrintoutSlice,
  doubleSideAadharSlice,
  passportPhotoSlice,
  ayushmanSlice
});

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["nonPersistSlice/setCollageInputRef"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["setCollageInputRef", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),

});


export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
