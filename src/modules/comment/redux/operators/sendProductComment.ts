// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetComment } from '../actions';
// services
import { commentService } from '../../service';
import { SendCommentDTO } from '../../dto/DTO';

// ----------------------------------------------------------------------

export default function sendProductComment(
  productId: number | string,
  userId: number | string | undefined,
  comment: SendCommentDTO,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await commentService.sendProductComment(productId, comment);

      const newComments = await commentService.getProductComments(productId, userId);
      dispatch(successfulGetComment(newComments.data));

      successfulCallback(response.data.message);
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
