import { Course, CourseCardProps, CourseContent, PageCourse } from '../models/course';

// ----------------------------------------------------------------------

export interface CourseState {
  course: Course;
  content: CourseContent[];
  pageCourses: PageCourse[];
  courses: {
    data: CourseCardProps[];
    meta: {
      current_page: number | string;
      from: number | string;
      last_page: number | string;
      links: any[];

      // first_page_url: string;
      // last_page_url: string;
      // next_page_url: string;
      // prev_page_url: string;

      per_page: number | string;
      to: number | string;
      total: number | string;
    };
  };
}

export const initialCourseState: CourseState = {
  course: {
    courseId: '',
    title: '',
    subtitle: '',
    description: '',
    duration: '',
    language: '',
    teacher: null,
    translator: null,
    dubler: null,
    price: 0,
    discount: 0,
    studentsCount: 0,
    content: [],
    isCurrentUserBuyer: false,
  },
  content: [],
  pageCourses: [],
  courses: {
    data: [],
    meta: { current_page: 1, from: '', total: '', links: [], per_page: '', to: '', last_page: 1 },
    // first_page_url: '',
    // last_page_url: '',
    // next_page_url: '',
    // prev_page_url: '',
  },
};
