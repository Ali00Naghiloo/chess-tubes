// eslint
/* eslint-disable class-methods-use-this */

// ----------------------------------------------------------------------

import axios from '@/utils/axios';

// ----------------------------------------------------------------------

export interface INewsService {
  getNews(newsId: string | number): Promise<any>;
  getInternalNews(queries: string): Promise<any>;
  getExternalNews(queries: string): Promise<any>;

  getPageNews(): Promise<any>;
}

export class NewsService implements INewsService {
  //
  async getNews(newsId: string | number): Promise<any> {
    const response = await axios.get(`api/news/${newsId}`);
    return response;
  }

  async getInternalNews(queries: string): Promise<any> {
    const response = await axios.get(`api/news?${queries}`);
    return response;
  }

  async getExternalNews(queries: string): Promise<any> {
    const response = await axios.get(`api/news?${queries}`);
    return response;
  }

  async getPageNews(): Promise<any> {
    const response = await axios.post(`api/news/page/index`);
    return response;
  }
}
