// eslint
/* eslint-disable class-methods-use-this */

// ----------------------------------------------------------------------

import axios from '@/utils/axios';

// ----------------------------------------------------------------------

export interface ICourseService {
  getCourse(courseId: string | number): Promise<any>;
  getPageCourses(page: 'index' | 'course'): Promise<any>;
  getListOfCourses(queries: string): Promise<any>;
}

export class CourseService implements ICourseService {
  //
  async getCourse(courseId: string | number): Promise<any> {
    const response = await axios.get(`api/course/${courseId}`);
    return response;
  }

  async getPageCourses(page: 'index' | 'course'): Promise<any> {
    const response = await axios.post(`api/courses/page/${page}`);
    return response;
  }

  async getListOfCourses(queries: string): Promise<any> {
    const response = await axios.get(`api/course?${queries}`);
    return response;
  }
}
