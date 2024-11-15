// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetHomeTestimonials } from '../actions';
// services
import { commentService } from '../../service';

// ----------------------------------------------------------------------

export default function getHomeTestimonials(successfulCallback: any, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await commentService.getHomeTestimonials();

      successfulCallback();

      // dispatch(successfulGetHomeTestimonials(response.data.data));
      dispatch(successfulGetHomeTestimonials(response.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
