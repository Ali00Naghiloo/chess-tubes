// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetNotifications } from '../actions';
// services
import { notificationService } from '../../service';

// ----------------------------------------------------------------------

export default function getNotifications(errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await notificationService.getNotifications();

      dispatch(successfulGetNotifications(response.data.data));
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
