// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetPageProducts } from '../actions';
// services
import { productService } from '../../service';

// ----------------------------------------------------------------------

export default function getPageProducts(
  page: 'index' | 'shop',
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await productService.getPageProducts(page);
      successfulCallback();
      dispatch(successfulGetPageProducts(response.data.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
