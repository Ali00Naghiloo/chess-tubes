// eslint
/* eslint-disable class-methods-use-this */

import axios from '@/utils/axios';

export interface Notification {
  getNotifications(): Promise<any>;

  readNotification(id: string): Promise<any>;
  readAllNotification(): Promise<any>;
}

export class NotificationService implements Notification {
  async getNotifications(): Promise<any> {
    const response = await axios.get('api/notification/list');
    return response;
  }

  async readNotification(id: string): Promise<any> {
    const response = await axios.post(`api/notification/show/${id}`);

    return response;
  }

  async readAllNotification(): Promise<any> {
    const response = await axios.post('api/notification/read-all');
    return response;
  }
}
