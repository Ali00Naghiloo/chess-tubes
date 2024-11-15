// eslint
/* eslint-disable class-methods-use-this */

// ----------------------------------------------------------------------

import axios from '@/utils/axios';

// ----------------------------------------------------------------------

export interface ICourseService {
  getCourse(courseId: string | number): Promise<any>;
  getPageCourses(): Promise<any>;
  getListOfCourses(queries: string): Promise<any>;
}

export class CourseService implements ICourseService {
  //
  async getCourse(courseId: string | number): Promise<any> {
    const response = await axios.get(`api/online-training/${courseId}`);
    return response;
  }

  async getPageCourses(): Promise<any> {
    const response = await axios.post(`api/online-training/page/onlineCourse`);
    return response;
  }

  async getListOfCourses(queries: string): Promise<any> {
    const response = await axios.get(`api/online-trainings/onlineCourse?${queries}`);
    return response;
  }
}
