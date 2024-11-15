// eslint
/* eslint-disable class-methods-use-this */

import axios from '@/utils/axios';

export interface FaqType {
  getData(): Promise<any>;
}

export class FaqService implements FaqType {
  async getData(): Promise<any> {
    const response = await axios.get('api/page/faqs/content');
    return response;
  }
}
