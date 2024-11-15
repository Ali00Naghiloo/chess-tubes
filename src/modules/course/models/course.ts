type strOrNum = string | number;

export interface Course {
  courseId: strOrNum;
  title: string;
  subtitle: string | null;
  description: string;
  duration: string;
  language: string;
  teacher: CourseCoOperators | null;
  translator: CourseCoOperators | null;
  dubler: CourseCoOperators | null;
  price: strOrNum;
  discount: strOrNum;
  studentsCount: strOrNum;
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
  courseId: string | number;
  slug: string;
  title: string;
  price: number;
  studentCount: number | string;
  duration: string;
  rating: string | number;
  image: string;
  discount: string | number;
  teacher: string;
}
export interface PageCourse {
  id: string | number;
  title: string;
  price: number | string;
  rating: number | string;
  mainImage: string;
  discountPercent: string | number;
}
