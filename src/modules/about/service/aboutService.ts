// eslint
/* eslint-disable class-methods-use-this */

import axios from '@/utils/axios';

export interface About {
  getAbouts(): Promise<any>;
}

export class AboutService implements About {
  async getAbouts(): Promise<any> {
    const response = await axios.get('api/page/about/content');
    return response;
  }
}
