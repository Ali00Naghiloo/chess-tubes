// eslint
/* eslint-disable class-methods-use-this */

// ----------------------------------------------------------------------

import axios from '@/utils/axios';

// ----------------------------------------------------------------------

export interface IQAndAService {
  getProductQAndA(productId: string | number, userId: string | number): Promise<any>;
  makeProductQuestion(productId: string | number, question: string): Promise<any>;

  getCourseQAndA(productId: string | number, userId: string | number): Promise<any>;
  makeCourseQuestion(productId: string | number, question: string): Promise<any>;

  makeAnswer(productId: string | number, answer: string): Promise<any>;
  likeOrDislike(answerId: string | number, type: 'like' | 'dislike'): Promise<any>;

  getUserQuestions(queries: string): Promise<any>;
  getUserAnswers(queries: string): Promise<any>;
}

export class QAndAService implements IQAndAService {
  //
  async getProductQAndA(productId: string | number, userId: string | number): Promise<any> {
    const response = await axios.get(`api/product/${productId}/question`);
    return response;
  }

  async makeProductQuestion(productId: string | number, question: string) {
    const response = await axios.post(`api/product/${productId}/question`, { question });
    return response;
  }

  // COURSE

  async getCourseQAndA(courseId: string | number, userId: string | number): Promise<any> {
    const response = await axios.get(`api/course/${courseId}/question`);
    return response;
  }

  async getOnlineTrainingAndA(courseId: string | number, userId: string | number): Promise<any> {
    const response = await axios.get(`api/online-training/${courseId}/question`);
    return response;
  }

  async makeCourseQuestion(courseId: string | number, question: string): Promise<any> {
    const response = await axios.post(`api/course/${courseId}/question`, { question });
    return response;
  }

  //

  async makeAnswer(questionId: string | number, answer: string): Promise<any> {
    const response = await axios.post(`api/question/${questionId}/answer`, { answer });
    return response;
  }

  async likeOrDislike(answerId: string | number, type: 'like' | 'dislike'): Promise<any> {
    const response = await axios.post(`api/answer/like/${answerId}`, { type });
    return response;
  }

  async getUserQuestions(queries: string): Promise<any> {
    const response = await axios.post(`api/questions/user-questions?${queries}`);
    return response;
  }

  async getUserAnswers(queries: string): Promise<any> {
    const response = await axios.post(`api/questions/user-answers?${queries}`);
    return response;
  }
}
