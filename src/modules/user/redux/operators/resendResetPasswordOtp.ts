// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { hasError, startLoading, successOperation } from '../actions';
// services
import { userService } from '../../services';

// ----------------------------------------------------------------------

export default function resendResetPasswordOtp(authInput: string, successfulCallback: any) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      await userService.resendForgetPasswordOtp(authInput);
      dispatch(successOperation());
      successfulCallback();
      //
    } catch (err) {
      dispatch(hasError(err.message));
    }
  };
}
