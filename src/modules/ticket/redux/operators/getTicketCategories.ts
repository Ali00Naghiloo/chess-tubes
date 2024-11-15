// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetTicketCategories } from '../actions';
// services
import { ticketService } from '../../service';

// ----------------------------------------------------------------------

export default function getTicketCategories(successfulCallback: any, errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ticketService.getTicketCategories();

      successfulCallback();

      dispatch(successfulGetTicketCategories(response.data.data));
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
