// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetUserQuestions } from '../actions';
// services
import { qAndAService } from '../../service';

// ----------------------------------------------------------------------

export default function getUserQuestions(
  queries: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await qAndAService.getUserQuestions(queries);
      dispatch(successfulGetUserQuestions(response.data.data));
      successfulCallback();
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
