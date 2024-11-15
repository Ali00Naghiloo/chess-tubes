// redux
import { Dispatch } from '@reduxjs/toolkit';
// utils
import axiosInstance from '@/utils/axios';
// actions
import { hasError, successOperation, successfullySearchQuery } from '../actions';

// ----------------------------------------------------------------------

export default function searchQuery(
  // type: 'news' | 'products' | 'courses' | null,
  type: string | null,
  query: string,
  extraQuery: string | null,
  successfulCallback: any,
  failureCallback: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const url = `api/search${type == null ? '' : `/${type}`}?q=${query}${
        extraQuery != null ? `&pt=${extraQuery}` : ''
      }`;

      const response = await axiosInstance.get(url);

      dispatch(successfullySearchQuery({ result: response.data.result.data }));

      dispatch(successOperation());

      successfulCallback();

      //
    } catch (err) {
      failureCallback(err.message);
      dispatch(hasError(err.message));
    }
  };
}
