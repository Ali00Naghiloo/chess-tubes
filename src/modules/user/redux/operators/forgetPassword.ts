// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { hasError, startLoading, successOperation } from '../actions';
// services
import { userService } from '../../services';

// ----------------------------------------------------------------------

export default function forgetPassword(
  authInput: string,
  successfulCallback: any,
  failureCallback: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      const response = await userService.forgetPassword(authInput);

      dispatch(successOperation());

      successfulCallback(response.data.message, response.data.data.type);
      //
    } catch (err) {
      failureCallback(err.message);

      dispatch(hasError(err.message));
    }
  };
}
