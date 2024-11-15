// redux
import { Dispatch } from '@reduxjs/toolkit';
// utils
import axiosInstance from '@/utils/axios';
// actions
import { hasError, successOperation } from '../actions';

// ----------------------------------------------------------------------

type PlaceNewOrderProps = {
  shipment: number;
  address: number;
  paytype: 'gate' | 'wallet';
};

export default function placeNewOrder(
  options: PlaceNewOrderProps,
  successfulCallback: any,
  failureCallback: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const {
        data: {
          data: { redirectUrl },
        },
      } = await axiosInstance.post(`api/order/save`, options);

      if (options.paytype === 'gate') {
        window.location.assign(redirectUrl);
      } else {
        window.location.assign('/dashboard/orders');
      }

      dispatch(successOperation());

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      successfulCallback != null && successfulCallback();

      //
    } catch (err) {
      failureCallback(err.message);
      dispatch(hasError(err.message));
    }
  };
}
