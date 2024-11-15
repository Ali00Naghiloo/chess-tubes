// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetTickets } from '../actions';
// services
import { ticketService } from '../../service';

// ----------------------------------------------------------------------

export default function getTickets(
  ticketQueries: string,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ticketService.getTickets(ticketQueries);

      successfulCallback();

      dispatch(successfulGetTickets(response.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
