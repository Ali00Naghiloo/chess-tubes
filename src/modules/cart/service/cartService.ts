// eslint
/* eslint-disable class-methods-use-this */

// ----------------------------------------------------------------------

import axios from '@/utils/axios';

// ----------------------------------------------------------------------

export interface ICommentService {
  getUserCart(): Promise<any>;

  // product
  addProductToCart(productId: string | number): Promise<any>;
  decreaseProductFromCart(productId: string | number): Promise<any>;

  // course
  addCourseToCart(courseId: string | number): Promise<any>;
  addCourseChapterToCart(chapterId: string | number): Promise<any>;
  addCourseEpisodeToCart(episodeId: string | number): Promise<any>;

  //

  removeItemFromCart(cartItemId: string | number): Promise<any>;
  emptyCart(): Promise<any>;
  applyCoupon(coupon: string): Promise<any>;
}

export class CartService implements ICommentService {
  //
  async getUserCart(): Promise<any> {
    const response = await axios.get(`api/cart`);
    return response;
  }

  async addProductToCart(productId: string | number): Promise<any> {
    const response = await axios.post(`api/cart/add/product/${productId}`);
    return response;
  }

  async decreaseProductFromCart(productId: string | number): Promise<any> {
    const response = await axios.post(`api/cart/update/product/${productId}`);
    return response;
  }

  // COURSE

  async addCourseToCart(courseId: string | number): Promise<any> {
    const response = await axios.post(`api/cart/add/course/${courseId}`);
    return response;
  }

  async addCourseChapterToCart(chapterId: string | number): Promise<any> {
    const response = await axios.post(`api/cart/add/course/chapter/${chapterId}`);
    return response;
  }

  async addCourseEpisodeToCart(episodeId: string | number): Promise<any> {
    const response = await axios.post(`api/cart/add/course/section/${episodeId}`);
    return response;
  }

  //

  async removeItemFromCart(cartItemId: string | number): Promise<any> {
    const response = await axios.delete(`api/cartitem/${cartItemId}`);
    return response;
  }

  async emptyCart(): Promise<any> {
    const response = await axios.delete(`api/cart`);
    return response;
  }

  async applyCoupon(code: string): Promise<any> {
    const response = await axios.post(`api/coupon/add`, { code });
    return response;
  }
}
