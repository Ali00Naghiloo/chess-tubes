// redux
import { Dispatch } from '@reduxjs/toolkit';
// utils
import { setSession } from '@/utils/axios';
// actions
import { hasError, startLoading, successOperation, userLoggedOut } from '../actions';
// services
import { authService, userService } from '../../services';

// ----------------------------------------------------------------------

export default function logout(successfulCallback: any, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      await userService.logout();

      authService.removeToken();

      successfulCallback();

      dispatch(userLoggedOut());

      dispatch(successOperation());

      setSession('');
      //
    } catch (err) {
      errorCallback();

      dispatch(hasError(err.message));
    }
  };
}
