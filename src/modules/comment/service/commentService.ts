// eslint
/* eslint-disable class-methods-use-this */

// ----------------------------------------------------------------------

// axios
import axios from '@/utils/axios';
// mock
import { _appTestimonials } from '@/_mock/arrays';
// dto
import { SendCommentDTO } from '../dto/DTO';

// ----------------------------------------------------------------------

export interface ICommentService {
  // PRODUCT
  getProductComments(
    productId: string | number,
    sortBy: string,
    userId: string | number | undefined
  ): Promise<any>;
  sendProductComment(productId: string | number, comment: SendCommentDTO): Promise<any>;
  loadMoreProductComments(link: string): Promise<any>;

  // COURSE
  getCourseComments(
    courseId: string | number,
    sortBy: string,
    userId: string | number | undefined
  ): Promise<any>;
  sendCourseComment(courseId: string | number, comment: SendCommentDTO): Promise<any>;
  loadMoreCourseComments(link: string): Promise<any>;

  likeOrDislikeComment(commentId: string | number, type: 'like' | 'dislike'): Promise<any>;

  getHomeTestimonials(): Promise<any>;

  getUserComments(queries: string): Promise<any>;
  getWaitingForComments(queries: string): Promise<any>;
}

export class CommentService implements ICommentService {
  //

  // PRODUCT

  async getProductComments(
    productId: string | number,
    userId: string | number | undefined,
    sortBy?: string
  ): Promise<any> {
    const response = await axios.get(`api/product/${productId}/comment?sort=${sortBy}`);
    return response;
  }

  async sendProductComment(productId: string | number, comment: SendCommentDTO): Promise<any> {
    const response = await axios.post(`api/product/${productId}/comment`, comment);
    return response;
  }

  async loadMoreProductComments(link: string): Promise<any> {
    const response = await axios.get(link);
    return response;
  }

  // COURSE

  async getCourseComments(
    courseId: string | number,
    userId: string | number | undefined
  ): Promise<any> {
    const response = await axios.get(`api/course/${courseId}/comments`);
    return response;
  }

  async getOnlineCourseComments(
    courseId: string | number,
    userId: string | number | undefined
  ): Promise<any> {
    const response = await axios.get(`api/online-training/${courseId}/comments`);
    return response;
  }

  async sendCourseComment(courseId: string | number, comment: SendCommentDTO): Promise<any> {
    const response = await axios.post(`api/course/${courseId}/comment`, comment);
    return response;
  }

  async sendOnlineCourseComment(courseId: string | number, comment: SendCommentDTO): Promise<any> {
    const response = await axios.post(`api/online-training/${courseId}/comment/send`, comment);
    return response;
  }

  async getOnlineCourseComment(courseId: string | number): Promise<any> {
    const response = await axios.get(`api/online-training/${courseId}/doComment`);
    return response;
  }

  async loadMoreCourseComments(link: string): Promise<any> {
    const response = await axios.get(link);
    return response;
  }

  //

  async likeOrDislikeComment(commentId: string | number, type: 'like' | 'dislike'): Promise<any> {
    const response = await axios.post(`api/comments/${commentId}/like`, { type });
    return response;
  }

  async getHomeTestimonials(): Promise<any> {
    // const response = await axios.get(`api/`);
    // return response;
    return { data: _appTestimonials };
  }

  async getUserComments(queries: string): Promise<any> {
    const response = await axios.post(`api/comments/user-comments?${queries}`);
    return response;
  }

  async getWaitingForComments(queries: string): Promise<any> {
    // const response = await axios.post(``);
    // return response;
    return new Promise((res) =>
      res({ data: { data: [], meta: { current_page: 1, last_page: 1 } } })
    );
  }
}
