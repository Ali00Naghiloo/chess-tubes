// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { hasError } from '../actions';
// services
import { userService } from '../../services';

// ----------------------------------------------------------------------

export default function myCourse(successfulCallback: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await userService.myCourses();
      successfulCallback(response.data.data);
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      //   errorCallback != null && errorCallback();
      dispatch(hasError(err.message));
    }
  };
}
