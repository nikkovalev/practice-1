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

import { categoriesAPI } from "@/api/categoriesAPI";

import authReducer from "./reducers/auth/authSlice";
import alertReducer from "./reducers/alert/alertSlice";
import globalReducer from "./reducers/global/globalSlice";

const rootReducer = combineReducers({
  authReducer,
  alertReducer,
  globalReducer,
  [categoriesAPI.reducerPath]: categoriesAPI.reducer,
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
    }).concat(categoriesAPI.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
