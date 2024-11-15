// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { productService } from '../../service';
// actions
import { successfulGetUerFavList } from '../actions';

// ----------------------------------------------------------------------

export default function addOrRemoveProductFromFav(
  productId: string | number,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await productService.addOrRemoveProductFromFav(productId);

      const getNewList = await productService.getUserFavProducts();

      dispatch(successfulGetUerFavList(getNewList.data.data));

      successfulCallback(response.data.message);
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
