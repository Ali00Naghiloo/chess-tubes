// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { hasError, startLoading, successOperation, successfulChangePersonalInfo } from '../actions';
// services
import { userService } from '../../services';
// dto
import { EditPersonalInfoProps } from '../../dtos/user';

// ----------------------------------------------------------------------

export default function editPersonalInfo(
  editedData: EditPersonalInfoProps,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      await userService.editPersonalInfo(editedData);
      successfulCallback();
      dispatch(successfulChangePersonalInfo(editedData));
      dispatch(successOperation());
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback();
      dispatch(hasError(err.message));
    }
  };
}
