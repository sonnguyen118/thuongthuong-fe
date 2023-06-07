import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import loadingReducer from "@slices/loadingState";
import languageSlice from "@slices/languageSlice";
import cartSlice from "@slices/cartSlice";
import adressSlice from "@slices/adressSlice";
import { combineReducers } from "@reduxjs/toolkit";
import uiSlice from "@slices/uiSlice";

const rootReducer = combineReducers({
  language: languageSlice.reducer,
  cart: cartSlice.reducer,
  adress: adressSlice.reducer,
  loading: loadingReducer,
  ui: uiSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["language", "cart", "adress"], // chỉ lưu trữ các state trong whitelist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
