// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetData } from '../actions';
// services
import { contactService } from '../../service';

// ----------------------------------------------------------------------

export default function getContactTransactions(successCallback?: () => void, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await contactService.getData();

      dispatch(successfulGetData(data.data));
      successCallback?.();
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
