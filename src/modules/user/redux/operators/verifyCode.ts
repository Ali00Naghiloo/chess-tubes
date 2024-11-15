// redux
import { Dispatch } from '@reduxjs/toolkit';
// utils
import { setSession } from '@/utils/axios';
// actions
import { hasError, startLoading, successOperation, userLoggedIn } from '../actions';
// services
import { authService, userService } from '../../services';

// ----------------------------------------------------------------------

export default function verifyCode(
  otpCode: string,
  mobile: string,
  successfulCallback: any,
  failureCallback: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      const response = await userService.verifyCode(otpCode, mobile);

      const { token } = response.data.data;

      authService.setToken(token);

      dispatch(userLoggedIn());

      setSession(token);

      dispatch(successOperation());

      successfulCallback(response.data.message);

      //
    } catch (err) {
      failureCallback(err.message);
      dispatch(hasError(err.message));
    }
  };
}
