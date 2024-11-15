// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { hasError, startLoading, successOperation, successfulChangeEmail } from '../actions';
// services
import { userService } from '../../services';

// ----------------------------------------------------------------------

export default function editUserEmailOtp(
  otpCode: string,
  data: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      await userService.doEditEmail(data, otpCode);
      successfulCallback();
      dispatch(successfulChangeEmail(data));
      dispatch(successOperation());
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
      dispatch(hasError(err.message));
    }
  };
}
