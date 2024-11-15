// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { courseService } from '../../service';
// actions
import { successfulGetListOfCourses } from '../actions';

// ----------------------------------------------------------------------

export default function getListOfCourses(
  queries: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await courseService.getListOfCourses(queries);

      successfulCallback();

      dispatch(successfulGetListOfCourses(response.data));

      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err);
    }
  };
}
