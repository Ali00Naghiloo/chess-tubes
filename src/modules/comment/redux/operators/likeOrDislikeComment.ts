// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetComment } from '../actions';
// services
import { commentService } from '../../service';

// ----------------------------------------------------------------------

export default function likeOrDislikeComment(
  productId: number | string,
  commentId: number | string,
  userId: number | string | undefined,
  type: 'like' | 'dislike',
  successfulCallback: any,
  errorCallback?: any,
  productType: 'course' | 'product' = 'product'
) {
  return async (dispatch: Dispatch) => {
    try {
      await commentService.likeOrDislikeComment(commentId, type);

      const response = await (productType === 'course'
        ? commentService.getCourseComments
        : commentService.getProductComments)(productId, userId);
      successfulCallback();
      dispatch(successfulGetComment(response.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
