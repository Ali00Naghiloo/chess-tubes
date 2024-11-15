// eslint
/* eslint-disable class-methods-use-this */

// ----------------------------------------------------------------------

import axios from '@/utils/axios';

// ----------------------------------------------------------------------

export interface IBannerService {
  getShopBanners(): Promise<any>;
  getCoursesBanners(): Promise<any>;
  getNewsBanners(): Promise<any>;
  getHomeBanners(): Promise<any>;
  getLiveAnalysisBanners(): Promise<any>;
}

export class BannerService implements IBannerService {
  //
  async getShopBanners(): Promise<any> {
    const response = await axios.get(`api/banner/page/shop`);
    return response;
  }

  async getCoursesBanners(): Promise<any> {
    const response = await axios.get(`api/banner/page/course`);
    return response;
  }

  async getOnlineCoursesBanners(): Promise<any> {
    const response = await axios.get(`api/banner/page/onlinecourse`);
    return response;
  }

  async getLiveAnalysisBanners(): Promise<any> {
    const response = await axios.get(`api/banner/page/liveanalysis`);
    return response;
  }

  async getNewsBanners(): Promise<any> {
    const response = await axios.get(`api/banner/page/news`);
    return response;
  }

  async getHomeBanners(): Promise<any> {
    const response = await axios.get(`api/banner/page/index`);
    return response;
  }
}
