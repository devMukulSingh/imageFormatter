import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./reducers/persistReducer";
import storage from 'redux-persist/lib/storage/createWebStorage'
import nonPersistedReducer from "@/app/redux/reducers/nonPersistReducer"

import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, pReducer)

const combinedReducers = combineReducers({
  persistedReducer,
  nonPersistedReducer
})

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['nonPersistSlice/setCollageInputRef'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['setCollageInputRef', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});

// export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
