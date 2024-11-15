// redux
import { Dispatch } from '@reduxjs/toolkit';
// utils
import axiosInstance from '@/utils/axios';
// actions
import { hasError, successOperation, successfullyGetLastSeenItems } from '../actions';

// ----------------------------------------------------------------------

export default function getLastSeenItems(successfulCallback: any, failureCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      successfulCallback();
      return;
      const response = await axiosInstance.get(``);

      dispatch(successfullyGetLastSeenItems(response.data.data));

      dispatch(successOperation());

      successfulCallback();
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      failureCallback != null && failureCallback(err.message);
      dispatch(hasError(err.message));
    }
  };
}
