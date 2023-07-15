import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  quantity: number;
  selected: boolean;
}

export interface CartState {
  items: Product[];
  totalQuantity: number;
  changed: boolean;
  allSelected: boolean;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  changed: false,
  allSelected: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleSelected(state) {
      state.allSelected = !state.allSelected;
    },

    replaceCart(state, action: PayloadAction<CartState>) {
      console.log(state, "state");
      state.items = action.payload.items;
      state.items.forEach((item) => {
        if (item.selected) {
          item.selected = false;
        }
      });
      state.totalQuantity = action.payload.totalQuantity;
      state.allSelected = action.payload.allSelected;
      console.log(action, "action");
    },

    checkItem(state, action: PayloadAction<number>) {
      const selectedId = action.payload;
      const selectedItem = state.items.find((item) => item.id === selectedId);
      if (selectedItem) {
        selectedItem.selected = !selectedItem.selected;
        const checkedType = selectedItem.selected;
        if (state.allSelected && !checkedType) {
          state.allSelected = false;
        } else if (!state.allSelected && checkedType) {
          if (state.items.every((item) => item.selected)) {
            state.allSelected = true;
          }
        }
      }
    },

    checkAllItems(state) {
      const isAllSelected = state.allSelected;
      state.items.forEach((item) => {
        item.selected = isAllSelected ? false : true;
      });
      state.allSelected = !isAllSelected;
    },

    addItemToCart(state, action: PayloadAction<Product>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          title: newItem.title,
          imageUrl: newItem.imageUrl,
          selected: newItem.selected,
        });
        state.allSelected = false;
      } else {
        existingItem.selected = existingItem.selected ? true : newItem.selected;
        existingItem.quantity++;
      }
    },

    decreaseItemQuantity(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (!existingItem) {
        return;
      }

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
      state.totalQuantity--;
      state.changed = true;
    },

    removeItemFromCart(state, action: PayloadAction<number[]>) {
      const ids = action.payload;
      ids.forEach(id => {
        const existingItem = state.items.find((item) => item.id === id);
        if (!existingItem) {
          return;
        }
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
      })
      state.changed = true;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
