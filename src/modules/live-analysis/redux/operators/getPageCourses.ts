// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { courseService } from '../../service';
// actions
import { successfulGetPageLiveAnalysis } from '../actions';

// ----------------------------------------------------------------------

export default function getPageLiveAnalysis(successfulCallback: any, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await courseService.getPageLiveAnalysis();

      successfulCallback();

      dispatch(successfulGetPageLiveAnalysis(response.data.data));

      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err);
    }
  };
}
