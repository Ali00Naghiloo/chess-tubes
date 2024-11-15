type strOrNum = string | number;

export interface Course {
  id: strOrNum;
  title: string;
  subtitle: string | null;
  description: string;
  duration: string;
  language: string;
  mainImage?: string;
  teacher: CourseCoOperators | null;
  translator: CourseCoOperators | null;
  dubler: CourseCoOperators | null;
  price: strOrNum;
  discount: { discountPercent: number; discountable_id: number };
  registeredCount: strOrNum;
  content: CourseContent[];
  isCurrentUserBuyer: boolean;
}

export interface CourseContent {
  id: strOrNum;
  course_id: strOrNum;
  title: string;
  duration: string;
  price: strOrNum;
  created_at: string; // !Should Change To Number At Server;
  updated_at: string; // !Should Change To Number At Server;
  discount: strOrNum | null;
  sections: CourseContentSections[];
}

export interface CourseContentSections {
  id: strOrNum;
  chapter_id: strOrNum;
  title: string;
  duration: string;
  price: strOrNum;
  discount: strOrNum | null;
}

export interface CourseCoOperators {
  id: strOrNum;
  fullname: string;
  avatar: string;
  about: string;
}

export interface CourseCardProps {
  id: string | number;
  slug: string;
  title: string;
  price: number;
  registeredCount: number | string;
  duration: string;
  rating: string | number;
  mainImage: string;
  event_status: {
    value: 'enrolling' | 'timeoutEnrolling' | 'fullCapacity' | 'running' | 'finished';
    title: string;
  };
  discount: string | number;
  teacherName: string;
}
export interface PageCourse {
  id: string | number;
  title: string;
  price: number | string;
  rating: number | string;
  mainImage: string;
  discountPercent: string | number;
}
