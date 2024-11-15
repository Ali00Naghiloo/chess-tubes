// redux
import { onlineCourseSlice } from './slice';

// ----------------------------------------------------------------------

export const {
  successfulGetCourse,
  successfulGetPageCourses,
  successfulGetListOfCourses,
  setCoupon,
} = onlineCourseSlice.actions;
