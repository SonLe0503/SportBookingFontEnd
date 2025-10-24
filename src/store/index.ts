import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import accountSlice from "./accountSlide";
import authSlide from "./authSlide";
import bookingSlice from "./bookingSlide";
import feedbackSlice from "./feedbackSlide";
import fieldSlice from "./fieldSlide";
import imageFieldSlice from "./imageFieldSlice";
import paymentSlice from "./paymentSlide";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["infoLogin", "isLogin"],
};

const reducers = {
  auth: persistReducer(persistConfig, authSlide),
  field: fieldSlice,
  feedback: feedbackSlice,
  imageField: imageFieldSlice,
  booking: bookingSlice,
  payment: paymentSlice,
  account: accountSlice,
};

const rootReducer = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
