import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex >= 0) {
        // items already exist
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(action.payload.name + " amount added", {
          position: "top-left",
        });
      } else {
        // items doest exist
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(action.payload.name + " added to cart", {
          position: "top-left",
        });
      }

      // save cart to localstorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(action.payload.name + " amount decreased", {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity == 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id != action.payload.id
        );
        state.cartItems = newCartItem;
        toast.info(action.payload.name + " removed", {
          position: "top-left",
        });
      }
      // save cart to localstorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART: (state, action) => {
      const newCartItem = state.cartItems.filter(
        (item) => item.id != action.payload.id
      );
      state.cartItems = newCartItem;
      toast.info(action.payload.name + " removed", {
        position: "top-left",
      });
      // save cart to localstorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART: (state, action) => {
      state.cartItems = [];
      toast.success("Cart cleared", {
        position: "top-left",
      });
      // save cart to localstorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_SUBTOTAL: (state, action) => {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemsAmount = price * cartQuantity;
        return array.push(cartItemsAmount);
      });
      const totalAmount = array.reduce((item, total) => {
        return item + total;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },
    CALCULATE_TOTAL_ITEM: (state, action) => {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const cartItemsQuantity = cartQuantity;
        return array.push(cartItemsQuantity);
      });
      const totalQuantity = array.reduce((item, total) => {
        return item + total;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_ITEM,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
