// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { ticketService } from '../../service';
import { changeClosingState, successfulCloseTicket } from '../actions';

// ----------------------------------------------------------------------

export default function closeTicket(
  ticketId: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(changeClosingState(true));

      const response = await ticketService.closeTicket(ticketId);

      dispatch(successfulCloseTicket());

      successfulCallback(response.data.message);
      dispatch(changeClosingState(false));
      //
    } catch (err) {
      dispatch(changeClosingState(false));
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
