// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { hasError, startLoading, successOperation, successfulChangeUsername } from '../actions';
// services
import { userService } from '../../services';

// ----------------------------------------------------------------------

export default function editUsername(
  username: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      await userService.editUsername(username);
      successfulCallback();
      dispatch(successfulChangeUsername({ username }));
      dispatch(successOperation());
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
      dispatch(hasError(err.message));
    }
  };
}
