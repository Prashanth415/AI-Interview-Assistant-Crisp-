import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage
import candidateReducer from './candidateSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['candidates', 'currentCandidateId'], // Only persist these
};

const persistedReducer = persistReducer(persistConfig, candidateReducer);

export const store = configureStore({
  reducer: {
    candidates: persistedReducer,
  },
  // Middleware setup to suppress the non-serializable value warning from redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);