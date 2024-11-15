// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { hasError, startLoading, successOperation } from '../actions';
// services
import { userService } from '../../services';

// ----------------------------------------------------------------------

export default function resetProfilePassword(
  dto?: { password: string; password_confirmation: string },
  successfulCallback?: any,
  failureCallback?: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      const resp = await userService.resetProfilePass(dto);

      dispatch(successOperation());

      successfulCallback(resp.data.message);

      //
    } catch (err) {
      failureCallback(err.message);

      dispatch(hasError(err.message));
    }
  };
}
