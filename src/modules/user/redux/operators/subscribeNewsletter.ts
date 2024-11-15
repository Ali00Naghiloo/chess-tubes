// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { hasError, startLoading, successOperation } from '../actions';
// services
import { userService } from '../../services';

// ----------------------------------------------------------------------

export default function subscribeNewsletter(
  email: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());

    try {
      const response = await userService.subscribeNewsletter(email);

      successfulCallback(response.message);
      // successfulCallback(response.data.message);

      dispatch(successOperation());
    } catch (err) {
      errorCallback(err.message);

      dispatch(hasError(err.message));
    }
  };
}
