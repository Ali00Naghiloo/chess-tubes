import { Course, CourseCardProps, CourseContent, PageCourse } from '../models/course';

// ----------------------------------------------------------------------

export interface CourseState {
  course: Course;
  content: CourseContent[];
  pageCourses: PageCourse[];
  courses: {
    data: CourseCardProps[];
    event_status: { value: string; title: string };
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
  copun: {
    coupon_discount: number;
    couponId: number;
  };
}

export const initialCourseState: CourseState = {
  course: {
    id: '',
    title: '',
    subtitle: '',
    description: '',
    duration: '',
    language: '',
    teacher: null,
    translator: null,
    dubler: null,
    price: 0,
    discount: { discountable_id: 0, discountPercent: 0 },
    registeredCount: 0,
    content: [],
    isCurrentUserBuyer: false,
    mainImage: '',
  },
  content: [],
  pageCourses: [],
  copun: {
    coupon_discount: 0,
    couponId: 0,
  },
  courses: {
    data: [],
    current_page: 1,
    from: '',
    total: '',
    links: [],
    per_page: '',
    to: '',
    last_page: 1,
    event_status: {
      value: '',
      title: '',
    },
  },
};
