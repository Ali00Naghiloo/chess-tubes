// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { hasError, startLoading, successOperation, successfulGetProvinces } from '../../actions';
// services
import { userService } from '../../../services';

// ----------------------------------------------------------------------

export default function getProvinces(successfulCallback: any) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const response = await userService.getProvinces();
      dispatch(successfulGetProvinces(response.data.data));
      dispatch(successOperation());
      successfulCallback();
      //
    } catch (err) {
      dispatch(hasError(err.message));
    }
  };
}
