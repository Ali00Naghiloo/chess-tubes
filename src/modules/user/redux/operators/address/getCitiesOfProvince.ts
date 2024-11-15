// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import {
  hasError,
  startLoading,
  successOperation,
  successfulGetCitiesOfProvince,
} from '../../actions';
// services
import { userService } from '../../../services';

// ----------------------------------------------------------------------

export default function getCitiesOfProvince(provinceId: string | number, successfulCallback: any) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const response = await userService.getCitiesOfProvince(provinceId);
      dispatch(successfulGetCitiesOfProvince({ [provinceId]: response.data }));
      dispatch(successOperation());
      successfulCallback();
      //
    } catch (err) {
      dispatch(hasError(err.message));
    }
  };
}
