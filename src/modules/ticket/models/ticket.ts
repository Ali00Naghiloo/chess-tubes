export type TicketState = 'Open' | 'Pending' | 'Answered' | 'Closed';

export interface TicketChat {
  ticket: TicketItem & { id: number };
  ticketState: TicketState;
  replies: TicketChatReply[];
}

export interface TicketChatReply {
  id: number;
  ticket_id: number;
  user_id: number;
  reply: string;
  created_at: string;
}

export interface TicketCategories {
  id: number;
  name: string;
}

export interface Tickets {
  tickets: TicketItem[];
  meta: TicketsMeta;
}

export interface TicketsMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface TicketItem {
  ticketId: number;
  category: string;
  subject: string;
  status: string;
  state: TicketState;
  createData: string;
  lastUpdateDate: string;
}
