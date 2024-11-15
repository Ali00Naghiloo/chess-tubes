// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { newsService } from '../../services';
// actions
import { successfulGetInternalNews } from '../actions';

// ----------------------------------------------------------------------

export default function getInternalNews(
  queries: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await newsService.getInternalNews(queries);

      successfulCallback();

      dispatch(successfulGetInternalNews(response.data.news));

      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err);
    }
  };
}
