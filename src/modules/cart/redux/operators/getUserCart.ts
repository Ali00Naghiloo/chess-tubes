// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetUserCart } from '../actions';
// services
import { cartService } from '../../service';

// ----------------------------------------------------------------------

export default function getUserCart(successfulCallback: any, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await cartService.getUserCart();
      dispatch(successfulGetUserCart(response.data.data));
      successfulCallback(response.data.data);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
