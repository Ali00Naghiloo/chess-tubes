// redux
import { Dispatch } from '@reduxjs/toolkit';
// utils
import axiosInstance from '@/utils/axios';
// actions
import { changeShipmentStatusOperation, hasError, successOperation } from '../actions';

// ----------------------------------------------------------------------

export default function getShipmentStatus(successfulCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.post(`api/checkout/shipping`);

      dispatch(changeShipmentStatusOperation(response.data.data.shippingState));

      dispatch(successOperation());

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      successfulCallback != null && successfulCallback();

      //
    } catch (err) {
      dispatch(hasError(err.message));
    }
  };
}
