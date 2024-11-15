// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetComment } from '../actions';
// services
import { commentService } from '../../service';

// ----------------------------------------------------------------------

export default function getCourseComments(
  courseId: number | string,
  userId: string | number | undefined,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await commentService.getCourseComments(courseId, userId);

      successfulCallback();

      dispatch(successfulGetComment(response.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
