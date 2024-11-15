// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetUserCart } from '../actions';
// services
import { cartService } from '../../service';

// ----------------------------------------------------------------------

export default function addCourseEpisodeToCart(
  episodeId: string | number,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const resp = await cartService.addCourseEpisodeToCart(episodeId);

      const response = await cartService.getUserCart();

      successfulCallback(resp.data.message);

      dispatch(successfulGetUserCart(response.data.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
