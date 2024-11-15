// types

import { TicketCategories, TicketChat, Tickets } from '../models/ticket';

// ----------------------------------------------------------------------

export interface TicketState {
  categories: TicketCategories[];
  tickets: Tickets;
  ticket: TicketChat;

  ticketOperationStates: {
    isClosing: boolean;
  };
}

const defaultTicket = {
  meta: { current_page: 0, from: 0, last_page: 0, per_page: 0, to: 0, total: 0 },
  tickets: [],
};

export const initialTicketState: TicketState = {
  categories: [],
  tickets: defaultTicket,
  ticket: {
    replies: [],
    ticket: {
      category: '',
      createData: '',
      lastUpdateDate: '',
      state: 'Open',
      status: '',
      subject: '',
      ticketId: 0,
      id: 0,
    },
    ticketState: 'Pending',
  },
  ticketOperationStates: {
    isClosing: false,
  },
};
