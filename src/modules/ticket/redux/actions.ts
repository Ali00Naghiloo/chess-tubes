// redux
import { ticketSlice } from './slice';

// ----------------------------------------------------------------------

export const {
  successfulGetTicketCategories,
  successfulGetTickets,
  successfulGetTicket,
  successfulCloseTicket,
  changeClosingState,
} = ticketSlice.actions;
