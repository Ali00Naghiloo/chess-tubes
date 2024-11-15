// eslint
/* eslint-disable class-methods-use-this */

// ----------------------------------------------------------------------

import axios from '@/utils/axios';
// dto
import { ReqForDiscountAndNotificationRequestProps } from '../dto/DTO';

// ----------------------------------------------------------------------

export interface IProductService {
  getProduct(productId: string | number): Promise<any>;
  addOrRemoveProductFromFav(productId: string | number): Promise<any>;
  requestStockAndDiscountNotification(productId: string | number): Promise<any>;

  getUserFavProducts(): Promise<any>;

  getPageProducts(page: 'shop' | 'index'): Promise<any>;

  getListOfProduct(queries: string): Promise<any>;
}

export class ProductService implements IProductService {
  //
  async getProduct(productId: string | number): Promise<any> {
    const response = await axios.get(`api/product/${productId}`);
    return response;
  }

  async requestStockAndDiscountNotification(productId: string | number): Promise<any> {
    const response = await axios.post(`api/product/${productId}/notification`);
    return response;
  }

  async addOrRemoveProductFromFav(productId: string | number): Promise<any> {
    const response = await axios.post(`api/product/${productId}/favourite`);
    return response;
  }

  async getUserFavProducts(): Promise<any> {
    const response = await axios.post(`api/product/favourite`);
    return response;
  }

  async getPageProducts(page: 'shop' | 'index'): Promise<any> {
    const response = await axios.post(`api/products/page/${page}`);
    return response;
  }

  async getListOfProduct(queries: string): Promise<any> {
    const response = await axios.get(`api/product?${queries}`);
    return response;
  }
}
