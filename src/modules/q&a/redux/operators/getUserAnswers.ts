// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetUserAnswers } from '../actions';
// services
import { qAndAService } from '../../service';

// ----------------------------------------------------------------------

export default function getUserAnswers(
  queries: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await qAndAService.getUserAnswers(queries);
      dispatch(successfulGetUserAnswers(response.data.data));
      successfulCallback();
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
