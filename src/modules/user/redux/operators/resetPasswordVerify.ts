// redux
import { Dispatch } from '@reduxjs/toolkit';
// utils
import { setSession } from '@/utils/axios';
// actions
import { hasError, redirecting, startLoading, successOperation, userLoggedIn } from '../actions';
// services
import { authService, userService } from '../../services';

// ----------------------------------------------------------------------

export default function resetPasswordVerify(
  otpCode: string,
  userInput: string,
  type: string,
  successfulCallback: any,
  failureCallback: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      const response = await userService.resetPasswordVerify(otpCode, userInput, type);

      const { token } = response.data.data;

      authService.setToken(token);

      setSession(token);

      dispatch(redirecting(true));

      dispatch(successOperation());

      dispatch(userLoggedIn());

      successfulCallback(response.data.message, response.data.data.token);
      //
    } catch (err) {
      failureCallback(err.message);

      dispatch(hasError(err.message));
    }
  };
}
