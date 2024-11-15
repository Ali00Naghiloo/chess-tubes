// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetUserComments } from '../actions';
// services
import { commentService } from '../../service';

// ----------------------------------------------------------------------

export default function getUserComments(
  queries: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await commentService.getUserComments(queries);
      dispatch(successfulGetUserComments(response.data));
      successfulCallback();
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
