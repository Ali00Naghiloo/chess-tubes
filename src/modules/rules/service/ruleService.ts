// eslint
/* eslint-disable class-methods-use-this */

import axios from '@/utils/axios';

export interface Rule {
  getRules(): Promise<any>;
}

export class RuleService implements Rule {
  async getRules(): Promise<any> {
    const response = await axios.get('api/page/rules/content');
    return response;
  }
}
