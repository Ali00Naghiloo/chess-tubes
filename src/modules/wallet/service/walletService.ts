// eslint
/* eslint-disable class-methods-use-this */

import axios from '@/utils/axios';

export interface WalletType {
  getData(): Promise<any>;
}

export class WalletService implements WalletType {
  async getData(): Promise<any> {
    const response = await axios.get('api/wallet');
    return response;
  }
}
