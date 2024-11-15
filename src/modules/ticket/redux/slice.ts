// redux
import { createSlice } from '@reduxjs/toolkit';
// states
import { initialTicketState } from './states';
// models
import { TicketChatReply } from '../models/ticket';

// ----------------------------------------------------------------------

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState: initialTicketState,
  reducers: {
    // SUCCESSFUL GET TICKET CATEGORIES
    successfulGetTicketCategories(preState, action) {
      preState.categories = action.payload;
    },

    // SUCCESSFUL GET TICKETS
    successfulGetTickets(preState, action) {
      preState.tickets.tickets = action.payload.data;
      preState.tickets.meta = action.payload.meta;
    },

    // SUCCESSFUL GET TICKET
    successfulGetTicket(preState, action) {
      const ticketData = action.payload;
      const msg = ticketData.ticket.message;
      const ticketId = ticketData.ticket.id;
      const id = ticketData.ticket.user_id;
      const { created_at } = ticketData.ticket;

      ticketData.replies.push({
        id: -1,
        ticket_id: ticketId,
        user_id: id,
        reply: msg,
        created_at,
      });

      ticketData.replies = ticketData.replies.sort(
        (x: TicketChatReply, y: TicketChatReply) => Number(x.created_at) - Number(y.created_at)
      );

      preState.ticket = ticketData;
    },

    // SUCCESSFUL CLOSE TICKET
    successfulCloseTicket(preState) {
      preState.ticket.ticketState = 'Closed';
    },

    //
    changeClosingState(preState, action) {
      preState.ticketOperationStates.isClosing = action.payload;
    },
  },
});
