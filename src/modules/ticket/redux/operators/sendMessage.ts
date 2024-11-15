// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { ticketService } from '../../service';
// actions
import { successfulGetTicket } from '../actions';

// ----------------------------------------------------------------------

export default function sendMessage(
  ticketId: string,
  replay: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      await ticketService.sendNewMessage(ticketId, replay);

      successfulCallback();

      const response = await ticketService.getTicket(ticketId);

      dispatch(successfulGetTicket(response.data.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
