// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { hasError, startLoading, successOperation } from '../actions';
// services
import { userService } from '../../services';

// ----------------------------------------------------------------------

export default function loginOrSignup(
  mobile: string,
  successfulCallback: any,
  failureCallback: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      await userService.loginOrSignup(mobile);
      dispatch(successOperation());
      successfulCallback();
      //
    } catch (err) {
      failureCallback(err.message);
      dispatch(hasError(err.message));
    }
  };
}
