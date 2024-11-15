// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { changeActiveAddressOperation, hasError, successOperation } from '../actions';

// ----------------------------------------------------------------------

export default function changeActiveAddress(newAddress: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(changeActiveAddressOperation(newAddress));

      dispatch(successOperation());

      //
    } catch (err) {
      dispatch(hasError(err));
    }
  };
}
