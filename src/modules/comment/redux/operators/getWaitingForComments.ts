// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetWaitingForComments } from '../actions';
// services
import { commentService } from '../../service';

// ----------------------------------------------------------------------

export default function getWaitingForComments(
  queries: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await commentService.getWaitingForComments(queries);
      dispatch(successfulGetWaitingForComments(response.data));
      successfulCallback();
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
