// redux
import { productSlice } from './slice';

// ----------------------------------------------------------------------

export const {
  successfulGetProduct,
  successfulGetUerFavList,
  successfulGetPageProducts,
  successfulGetListOfProducts,
} = productSlice.actions;
