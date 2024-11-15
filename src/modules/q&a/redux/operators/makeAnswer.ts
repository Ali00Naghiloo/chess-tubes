// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { qAndAService } from '../../service';

// ----------------------------------------------------------------------

export default function makeAnswer(
  questionId: number | string,
  answer: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await qAndAService.makeAnswer(questionId, answer);
      successfulCallback(response.data.message);

      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
