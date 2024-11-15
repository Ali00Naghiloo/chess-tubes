// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { orderService } from '../../service';
// actions
import { successfullyGetInprogressOrders } from '../actions';

// ----------------------------------------------------------------------

export default function getInprogressOrders(
  queries: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await orderService.getInprogressOrders(queries);

      dispatch(successfullyGetInprogressOrders(response.data));

      successfulCallback();
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
