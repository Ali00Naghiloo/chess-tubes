// redux
import { Dispatch } from '@reduxjs/toolkit';

// actions
import { deleteUserAddress, hasError, startLoading, successOperation } from '../../actions';
// services
import { userService } from '../../../services';

// ----------------------------------------------------------------------

export default function deleteAddress(addressId: string, successfulCallback: any) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      await userService.deleteAddress(addressId);
      dispatch(deleteUserAddress(addressId));
      dispatch(successOperation());
      successfulCallback();
      //
    } catch (err) {
      dispatch(hasError(err.message));
    }
  };
}
