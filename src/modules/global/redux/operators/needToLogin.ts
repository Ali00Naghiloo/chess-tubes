// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { needLoginToProceed, hasError, successOperation } from '../actions';

// ----------------------------------------------------------------------

export default function needToLogin(newStatus: boolean) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(needLoginToProceed(newStatus));

      dispatch(successOperation());

      //
    } catch (err) {
      dispatch(hasError(err));
    }
  };
}
