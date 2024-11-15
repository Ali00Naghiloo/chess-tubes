// redux
import { Dispatch } from '@reduxjs/toolkit';
// utils
import axiosInstance from '@/utils/axios';
// actions
import { hasError, successOperation, successfullyGetStatisticalInfo } from '../actions';

// ----------------------------------------------------------------------

export default function getStatisticalInfo(successfulCallback: any, failureCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.get(`api/page/index/statisticalInfo `);

      dispatch(successfullyGetStatisticalInfo(response.data.data));

      dispatch(successOperation());

      successfulCallback();
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      failureCallback != null && failureCallback(err.message);
      dispatch(hasError(err.message));
    }
  };
}
