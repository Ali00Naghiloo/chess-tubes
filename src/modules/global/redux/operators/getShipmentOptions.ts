// redux
import { Dispatch } from '@reduxjs/toolkit';
// utils
import axiosInstance from '@/utils/axios';
// actions
import { addShipmentOptions, hasError, successOperation } from '../actions';

// ----------------------------------------------------------------------

export default function getShipmentOptions(successfulCallback: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.get(`api/shipment`);

      dispatch(addShipmentOptions(response.data.data));

      dispatch(successOperation());

      successfulCallback();

      //
    } catch (err) {
      dispatch(hasError(err.message));
    }
  };
}
