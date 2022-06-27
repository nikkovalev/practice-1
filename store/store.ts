import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";

import { authApi } from "./auth/authApi";
import { categoriesApi } from "./categories/categoriesApi";

import { authReducer } from "./auth/authSlice";
import { globalReducer } from "./global/globalSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  global: globalReducer,
  [authApi.reducerPath]: authApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, categoriesApi.middleware),
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export default store;
