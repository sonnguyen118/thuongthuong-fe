import { Dispatch } from "@reduxjs/toolkit";
import { CartState, cartActions } from "@slices/cartSlice";

export const fetchCartData = (): any => {
  return (dispatch: Dispatch) => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "{}");
    if(cartData.length > 0) {
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
          changed: false,
          allSelected: false,
        })
      );
    }

  };
};

export const saveCartData = (cart: CartState): void => {
  localStorage.setItem(
    "cart",
    JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity })
  );
};
