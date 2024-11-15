// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetProductQAndA } from '../actions';
// services
import { qAndAService } from '../../service';

// ----------------------------------------------------------------------

export default function getProductQAndA(
  productId: number | string,
  userId: string | number,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await qAndAService.getProductQAndA(productId, userId);
      successfulCallback();
      dispatch(successfulGetProductQAndA(response.data.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
