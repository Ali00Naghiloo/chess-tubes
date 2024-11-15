// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { hasError, startLoading, successOperation, successfulChangeEmail } from '../actions';
// services
import { userService } from '../../services';
// dto
import { ChangeEmailProps } from '../../dtos/user';

// ----------------------------------------------------------------------

export default function editUserEmail(
  editedData: ChangeEmailProps,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      await userService.editEmail(editedData);
      successfulCallback();
      dispatch(successfulChangeEmail(editedData));
      dispatch(successOperation());
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
      dispatch(hasError(err.message));
    }
  };
}
