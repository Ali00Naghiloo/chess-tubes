// redux
import { createSlice } from '@reduxjs/toolkit';
// states
import { initialCartState } from './states';

// ----------------------------------------------------------------------

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    successfulGetUserCart(state, action) {
      if (action.payload.length !== 0) {
        return action.payload;
      }
      if (action.payload.length === 0) {
        return initialCartState;
      }
      return state;
    },

    // SUCCESSFUL ADD PRODUCT TO CART
    successfulAddProductToCart() {},
  },
});
