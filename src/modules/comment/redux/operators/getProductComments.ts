// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetComment } from '../actions';
// services
import { commentService } from '../../service';

// ----------------------------------------------------------------------

export default function getProductComments(
  productId: number | string,
  sortBy: string | undefined,
  userId: string | number | undefined,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await commentService.getProductComments(productId, userId, sortBy);
      successfulCallback();
      dispatch(successfulGetComment(response.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
