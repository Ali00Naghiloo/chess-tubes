// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import {
  hasError,
  startLoading,
  successOperation,
  successfulGetUserAddresses,
} from '../../actions';
// services
import { userService } from '../../../services';

// ----------------------------------------------------------------------

export default function getUserAddresses(successfulCallback?: any) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const response = await userService.getAddresses();
      dispatch(successfulGetUserAddresses(response.data.data));
      dispatch(successOperation());

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      successfulCallback != null && successfulCallback();
      //
    } catch (err) {
      dispatch(hasError(err.message));
    }
  };
}
