// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetNotifications } from '../actions';
// services
import { notificationService } from '../../service';

// ----------------------------------------------------------------------

export default function readNotification(
  id: string,
  successfulCallback?: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const resp = await notificationService.readNotification(id);

      const response = await notificationService.getNotifications();

      successfulCallback(resp.data.message);

      dispatch(successfulGetNotifications(response.data.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
