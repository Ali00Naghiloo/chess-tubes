// eslint
/* eslint-disable class-methods-use-this */

// ----------------------------------------------------------------------

import axios from '@/utils/axios';

// ----------------------------------------------------------------------

export interface IOrderService {
  getInprogressOrders(queries: string): Promise<any>;
  getCompletedOrders(queries: string): Promise<any>;
  getCancelledOrders(queries: string): Promise<any>;
  getReturnedOrders(queries: string): Promise<any>;

  getOrder(orderId: string): Promise<any>;
  resumeOrder(orderId: string): Promise<any>;
}

export class OrderService implements IOrderService {
  //

  async getInprogressOrders(queries: string): Promise<any> {
    const response = await axios.post(`api/orders?${queries}`, { status: 'inProgress' });
    return response;
  }

  async getCompletedOrders(queries: string): Promise<any> {
    const response = await axios.post(`api/orders?${queries}`, { status: 'completed' });
    return response;
  }

  async getCancelledOrders(queries: string): Promise<any> {
    const response = await axios.post(`api/orders?${queries}`, { status: 'cancelled' });
    return response;
  }

  async getReturnedOrders(queries: string): Promise<any> {
    const response = await axios.post(`api/orders?${queries}`, { status: 'returned' });
    return response;
  }

  async getOrder(orderId: string): Promise<any> {
    const response = await axios.post(`api/order/${orderId}`);
    return response;
  }

  async resumeOrder(orderId: string): Promise<any> {
    const response = await axios.post(`api/order/refresh/state/${orderId}`);
    return response;
  }
}
