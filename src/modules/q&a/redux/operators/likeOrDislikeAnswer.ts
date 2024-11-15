// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { qAndAService } from '../../service';
import { successfulGetProductQAndA } from '../actions';

// ----------------------------------------------------------------------

export default function likeOrDislikeAnswer(
  productId: number | string,
  userId: number | string,
  answerId: number | string,
  type: 'like' | 'dislike',
  productType: 'product' | 'course',
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      await qAndAService.likeOrDislike(answerId, type);

      if (productType === 'course') {
        const response = await qAndAService.getCourseQAndA(productId, userId);
        dispatch(successfulGetProductQAndA(response.data.data));
      } else {
        const response = await qAndAService.getProductQAndA(productId, userId);
        dispatch(successfulGetProductQAndA(response.data.data));
      }

      successfulCallback();

      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
