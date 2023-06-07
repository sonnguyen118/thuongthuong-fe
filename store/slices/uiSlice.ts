import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Notification {
  status: string;
  title: string;
  message: string;
}

interface NotificationState {
  isCartVisible: boolean;
  notification: Notification;
}

const initialState: NotificationState = {
  isCartVisible: false,
  notification: {
    status: "ok",
    title: "",
    message: "",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggle(state) {
      state.isCartVisible = !state.isCartVisible;
    },
    showNotification(state, action: PayloadAction<Notification>) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
