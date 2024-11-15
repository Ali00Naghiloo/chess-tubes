// redux
import { Dispatch } from '@reduxjs/toolkit';
// models
import { UserAddress } from '@/modules/user/models/user';
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

export default function addAddress(
  address: UserAddress,
  successfulCallback: any,
  failureCallback?: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      await userService.addAddress(address);
      // dispatch(addUserAddress(address));

      const response = await userService.getAddresses();
      dispatch(successfulGetUserAddresses(response.data.data));

      dispatch(successOperation());
      successfulCallback();
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      failureCallback != null && failureCallback(err.message);
      dispatch(hasError(err.message));
    }
  };
}
