// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetShopBanner } from '../actions';
// services
import { bannerService } from '../../service';

// ----------------------------------------------------------------------

export default function getShopBanner(successfulCallback: any, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await bannerService.getShopBanners();
      successfulCallback();
      dispatch(successfulGetShopBanner(response.data.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
