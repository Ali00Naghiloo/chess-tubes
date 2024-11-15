// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { newsService } from '../../services';
// actions
import { successfulGetPageNews } from '../actions';

// ----------------------------------------------------------------------

export default function getPageNews(successfulCallback: any, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await newsService.getPageNews();

      dispatch(successfulGetPageNews(response.data.data));

      successfulCallback();
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err);
    }
  };
}
