// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { hasError, startLoading, successOperation } from '../actions';
// services
import { userService } from '../../services';

// ----------------------------------------------------------------------

export default function resendOtp(mobile: string, successfulCallback: any) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      await userService.resendOtp(mobile);
      dispatch(successOperation());
      successfulCallback();
      //
    } catch (err) {
      dispatch(hasError(err.message));
    }
  };
}
