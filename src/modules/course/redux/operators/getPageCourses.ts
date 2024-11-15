// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { courseService } from '../../service';
// actions
import { successfulGetPageCourses } from '../actions';

// ----------------------------------------------------------------------

export default function getPageCourses(
  page: 'index' | 'course',
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await courseService.getPageCourses(page);

      successfulCallback();

      dispatch(successfulGetPageCourses(response.data.data));

      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err);
    }
  };
}
