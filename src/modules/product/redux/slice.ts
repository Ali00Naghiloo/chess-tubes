// redux
import { createSlice } from '@reduxjs/toolkit';
// states
import { initialProductState } from './states';

// ----------------------------------------------------------------------

export const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {
    // SUCCESSFUL GET PRODUCT
    successfulGetProduct(state, action) {
      state.product = action.payload;
    },

    // SUCCESSFUL GET USER FAV LIST
    successfulGetUerFavList(state, action) {
      state.favorites = action.payload;
    },

    // SUCCESSFUL GET PAGE PRODUCTS
    successfulGetPageProducts(state, action) {
      state.pageProducts = action.payload;
    },

    // SUCCESSFUL GET LIST OF PRODUCTS
    successfulGetListOfProducts(state, action) {
      state.products = action.payload;
    },
  },
});
