// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { orderService } from '../../service';
// actions
import { successfullyGetCompletedOrders } from '../actions';

// ----------------------------------------------------------------------

export default function getCompletedOrders(
  queries: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await orderService.getCompletedOrders(queries);

      dispatch(successfullyGetCompletedOrders(response.data));

      successfulCallback();
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
