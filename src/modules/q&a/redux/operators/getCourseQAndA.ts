// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetProductQAndA } from '../actions';
// services
import { qAndAService } from '../../service';

// ----------------------------------------------------------------------

export default function getCourseQAndA(
  courseId: number | string,
  userId: string | number,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await qAndAService.getCourseQAndA(courseId, userId);
      successfulCallback();
      dispatch(successfulGetProductQAndA(response.data.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
