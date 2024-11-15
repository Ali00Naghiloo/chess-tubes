// eslint
/* eslint-disable class-methods-use-this */

// ----------------------------------------------------------------------

import axios from '@/utils/axios';

// ----------------------------------------------------------------------

export interface ICourseService {
  getCourse(courseId: string | number): Promise<any>;
  getPageLiveAnalysis(): Promise<any>;
  getListOfCourses(queries: string): Promise<any>;
}

export class LiveAnalysisService implements ICourseService {
  //
  async getCourse(courseId: string | number): Promise<any> {
    const response = await axios.get(`api/online-training/${courseId}`);
    return response;
  }

  async getPageLiveAnalysis(): Promise<any> {
    const response = await axios.post(`api/online-training/page/liveanalysis`);
    return response;
  }

  async getListOfCourses(queries: string): Promise<any> {
    const response = await axios.get(`api/online-trainings/liveanalysis?${queries}`);
    return response;
  }
}
