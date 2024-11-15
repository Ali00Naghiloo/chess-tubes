// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { activeShipmentType, hasError, successOperation } from '../actions';

// ----------------------------------------------------------------------

export default function changeActiveShipmentType(newType: string | number) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(activeShipmentType(newType));

      dispatch(successOperation());

      //
    } catch (err) {
      dispatch(hasError(err));
    }
  };
}
