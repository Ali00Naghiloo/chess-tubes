// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetNewsBanner } from '../actions';
// services
import { bannerService } from '../../service';

// ----------------------------------------------------------------------

export default function getNewsBanners(successfulCallback: any, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await bannerService.getNewsBanners();
      successfulCallback();
      dispatch(successfulGetNewsBanner(response.data.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
