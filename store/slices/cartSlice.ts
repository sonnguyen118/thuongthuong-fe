import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: {
    id: number;
    urlImage: string;
    title: string;
    price: number;
    quantity: number;
    total: number;
  }[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartState["items"][0]>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.items[index].quantity += action.payload.quantity;
        state.items[index].total += action.payload.total;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ urlImage: string; quantity: number }>
    ) => {
      const index = state.items.findIndex(
        (item) => item.urlImage === action.payload.urlImage
      );
      if (index >= 0) {
        state.items[index].quantity = action.payload.quantity;
        state.items[index].total =
          state.items[index].price * action.payload.quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateItemQuantity } = cartSlice.actions;

export default cartSlice;
