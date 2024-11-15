// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { hasError, startLoading, successChangeAvatar, successOperation } from '../actions';
// services
import { userService } from '../../services';

// ----------------------------------------------------------------------

export default function changeAvatar(
  userAvatar: File,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      const response = await userService.changeAvatar(userAvatar);

      successfulCallback(response.data.message);

      dispatch(successOperation());

      const newAvatar = response.data.data.url;
      // ! temporary turn https to http
      dispatch(successChangeAvatar(newAvatar.replace('https', 'http')));
    } catch (err) {
      errorCallback(err.message);

      dispatch(hasError(err.message));
    }
  };
}
