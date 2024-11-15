// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetTicket } from '../actions';
// services
import { ticketService } from '../../service';

// ----------------------------------------------------------------------

export default function getTicket(ticketId: string, successfulCallback: any, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ticketService.getTicket(ticketId);

      successfulCallback();

      dispatch(successfulGetTicket(response.data.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
