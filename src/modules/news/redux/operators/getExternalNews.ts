// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { newsService } from '../../services';
// actions
import { successfulGetExternalNews } from '../actions';

// ----------------------------------------------------------------------

export default function getExternalNews(
  queries: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await newsService.getExternalNews(queries);

      successfulCallback();

      dispatch(successfulGetExternalNews(response.data.news));

      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err);
    }
  };
}
