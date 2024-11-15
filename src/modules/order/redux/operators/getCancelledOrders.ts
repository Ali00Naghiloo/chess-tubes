// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { orderService } from '../../service';
// actions
import { successfullyGetCanceledOrders } from '../actions';

// ----------------------------------------------------------------------

export default function getCancelledOrders(
  queries: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await orderService.getCancelledOrders(queries);

      dispatch(successfullyGetCanceledOrders(response.data));

      successfulCallback();
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
