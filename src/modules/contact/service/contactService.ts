// eslint
/* eslint-disable class-methods-use-this */

import axios from '@/utils/axios';

export interface ContactType {
  getData(): Promise<any>;
}

export class ContactService implements ContactType {
  async getData(): Promise<any> {
    const response = await axios.get('api/page/contact');
    return response;
  }
}
