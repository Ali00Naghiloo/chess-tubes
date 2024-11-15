// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { courseService } from '../../service';
// actions
import { successfulGetCourse } from '../actions';

// ----------------------------------------------------------------------

export default function getCourse(
  courseId: string | number,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await courseService.getCourse(courseId);

      successfulCallback();

      dispatch(successfulGetCourse(response.data.data));

      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err);
    }
  };
}
