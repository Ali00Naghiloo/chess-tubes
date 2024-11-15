// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetUerFavList } from '../actions';
// services
import { productService } from '../../service';

// ----------------------------------------------------------------------

export default function getUserFavList(successfulCallback: any, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await productService.getUserFavProducts();
      successfulCallback();
      dispatch(successfulGetUerFavList(response.data.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
