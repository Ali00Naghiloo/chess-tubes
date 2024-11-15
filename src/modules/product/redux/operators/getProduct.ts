// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
// services
import { productService } from '../../service';
import { successfulGetProduct } from '../actions';

// ----------------------------------------------------------------------

export default function getProduct(
  productId: string | number,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await productService.getProduct(productId);
      successfulCallback();
      dispatch(successfulGetProduct(response.data.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err);
    }
  };
}
