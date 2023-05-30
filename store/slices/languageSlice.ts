import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  currentLanguage: string;
  titleLanguage: string;
}

const initialState: LanguageState = {
  currentLanguage: "VI",
  titleLanguage: "Tiếng Việt",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (
      state,
      action: PayloadAction<{ current: string; title: string }>
    ) => {
      state.currentLanguage = action.payload.current;
      state.titleLanguage = action.payload.title;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice;
