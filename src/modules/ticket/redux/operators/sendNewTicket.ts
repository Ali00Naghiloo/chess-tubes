// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { ticketService } from '../../service';
// dto
import { TicketSendData } from '../../dto/DTO';

// ----------------------------------------------------------------------

export default function sendNewTicket(
  ticketData: TicketSendData,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ticketService.sendNewTicket(ticketData);

      successfulCallback(response.data.data.ticketId);

      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
