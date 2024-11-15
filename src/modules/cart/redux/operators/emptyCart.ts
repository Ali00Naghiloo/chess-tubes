// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetUserCart } from '../actions';
// services
import { cartService } from '../../service';

// ----------------------------------------------------------------------

export default function emptyCart(successfulCallback: any, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const resp = await cartService.emptyCart();

      const response = await cartService.getUserCart();

      dispatch(successfulGetUserCart(response.data.data));

      successfulCallback(resp.data.message);
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
