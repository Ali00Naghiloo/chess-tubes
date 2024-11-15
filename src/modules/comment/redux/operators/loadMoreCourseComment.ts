// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulLoadMoreComments } from '../actions';
// services
import { commentService } from '../../service';

// ----------------------------------------------------------------------

export default function loadMoreCourseComment(
  link: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await commentService.loadMoreCourseComments(link);
      successfulCallback();
      dispatch(successfulLoadMoreComments(response.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
