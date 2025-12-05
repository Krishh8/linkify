import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // uses localStorage
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './userSlice';
import urlReducer from './urlSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["user"],
};

const rootReducer = combineReducers({
    user: userReducer,
    urls: urlReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);