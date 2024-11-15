// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { qAndAService } from '../../service';

// ----------------------------------------------------------------------

export default function makeProductQuestion(
  productId: number | string,
  question: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await qAndAService.makeProductQuestion(productId, question);
      successfulCallback(response.data.message);

      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
