// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
// services
import { productService } from '../../service';
import { successfulGetListOfProducts } from '../actions';

// ----------------------------------------------------------------------

export default function getListOfProduct(
  queries: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await productService.getListOfProduct(queries);
      successfulCallback();
      dispatch(successfulGetListOfProducts(response.data.products));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
