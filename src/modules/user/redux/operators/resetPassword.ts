// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { hasError, startLoading, successOperation } from '../actions';
// services
import { userService } from '../../services';

// ----------------------------------------------------------------------

export default function resetPassword(
  password: string,
  successfulCallback: any,
  failureCallback?: any,
  token?: string
) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      const resp = await userService.resetPassword(password, token);

      dispatch(successOperation());

      successfulCallback(resp.data.message);

      //
    } catch (err) {
      failureCallback(err.message);

      dispatch(hasError(err.message));
    }
  };
}
