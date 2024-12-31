import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import userReducer from '@/features/user/userSlice';
import { counterReducer } from '@/features/counterSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use AsyncStorage for React Native
import loadingReducer from '@/features/loading/loadingSlice';
import { currentCvSlice } from '@/features/CurrentCv/currentCvSlice';

// Configure persistence for reducers
const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedCurrentCvReducer = persistReducer(persistConfig, currentCvSlice.reducer);

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    counter: counterReducer,
    loading: loadingReducer,
    user: persistedUserReducer, // Add persisted reducer
    currentCV: persistedCurrentCvReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable if non-serializable data is used
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store); // Create persistor

export default store;
