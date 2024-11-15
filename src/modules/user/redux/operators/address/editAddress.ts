// redux
import { Dispatch } from '@reduxjs/toolkit';
// models
import { UserAddress } from '@/modules/user/models/user';
// actions
import { editUserAddress, hasError, startLoading, successOperation } from '../../actions';
// services
import { userService } from '../../../services';

// ----------------------------------------------------------------------

export default function editAddress(
  address: UserAddress,
  successfulCallback: any,
  failureCallback?: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      await userService.editAddress(address);
      dispatch(editUserAddress(address));

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
