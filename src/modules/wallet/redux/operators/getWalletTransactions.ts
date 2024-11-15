// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetData } from '../actions';
// services
import { walletService } from '../../service';

// ----------------------------------------------------------------------

export default function getWalletTransactions(successCallback?: () => void, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await walletService.getData();

      dispatch(successfulGetData(data));
      successCallback?.();
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
