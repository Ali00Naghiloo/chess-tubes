// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetHomeBanner } from '../actions';
// services
import { bannerService } from '../../service';

// ----------------------------------------------------------------------

export default function getHomeBanners(successfulCallback: any, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await bannerService.getHomeBanners();
      successfulCallback();
      dispatch(successfulGetHomeBanner(response.data.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
