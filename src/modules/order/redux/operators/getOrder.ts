// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { orderService } from '../../service';
// actions
import { successfullyGetOrderData } from '../actions';

// ----------------------------------------------------------------------

export default function getOrder(orderId: string, successfulCallback: any, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await orderService.getOrder(orderId);

      dispatch(successfullyGetOrderData(response.data.data));

      successfulCallback();
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}