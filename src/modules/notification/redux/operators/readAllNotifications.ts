// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetNotifications } from '../actions';
// services
import { notificationService } from '../../service';

// ----------------------------------------------------------------------

export default function readAllNotification(successfulCallback?: any, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const resp = await notificationService.readAllNotification();

      const response = await notificationService.getNotifications();

      dispatch(successfulGetNotifications(response.data.data));

      successfulCallback(resp.data.message);
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
