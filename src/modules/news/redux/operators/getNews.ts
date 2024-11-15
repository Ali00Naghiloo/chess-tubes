// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { newsService } from '../../services';
// actions
import { successfulGetNews } from '../actions';

// ----------------------------------------------------------------------

export default function getNews(
  newsId: string | number,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await newsService.getNews(newsId);

      successfulCallback();

      dispatch(successfulGetNews(response.data.data));

      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err);
    }
  };
}
