// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { hasError, startLoading, successOperation, successfulChangePhoneNumber } from '../actions';
// services
import { userService } from '../../services';

// ----------------------------------------------------------------------

export default function changePhoneNumber(
  otpCode: number | string,
  mobile: number | string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      const response = await userService.changePhone(otpCode, mobile);
      successfulCallback(response.data.message);
      dispatch(successOperation());
      dispatch(successfulChangePhoneNumber(mobile));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
      dispatch(hasError(err.message));
    }
  };
}
