// eslint
/* eslint-disable class-methods-use-this */

// ----------------------------------------------------------------------

// axios
import axios from '@/utils/axios';
// dto
import { TicketSendData } from '../dto/DTO';

// ----------------------------------------------------------------------

export interface ITicketService {
  getTicketCategories(): Promise<any>;
  sendNewTicket(ticketData: TicketSendData): Promise<any>;
  getTickets(queries: string): Promise<any>;
  getTicket(ticketId: string): Promise<any>;

  sendNewMessage(ticketId: string, replay: string): Promise<any>;
  closeTicket(ticketId: string): Promise<any>;
}

export class TicketService implements ITicketService {
  //

  async getTicketCategories(): Promise<any> {
    const response = await axios.get(`api/ticket/categories`);
    return response;
  }

  async sendNewTicket(ticketData: TicketSendData): Promise<any> {
    const response = await axios.post(`api/ticket`, ticketData);
    return response;
  }

  async getTickets(queries: string): Promise<any> {
    const response = await axios.get(`api/ticket?${queries}`);
    return response;
  }

  async getTicket(ticketId: string): Promise<any> {
    const response = await axios.get(`api/ticket/${ticketId}`);
    return response;
  }

  async sendNewMessage(ticketId: string, replay: string): Promise<any> {
    const response = await axios.post(`api/ticket/${ticketId}/reply`, { reply: replay });
    return response;
  }

  async closeTicket(ticketId: string): Promise<any> {
    const response = await axios.post(`api/ticket/${ticketId}/close`);
    return response;
  }
}
