// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetAbouts } from '../actions';
// services
import { aboutService } from '../../service';

// ----------------------------------------------------------------------

export default function getAbouts(errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await aboutService.getAbouts();

      dispatch(successfulGetAbouts(response.data.data));
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
