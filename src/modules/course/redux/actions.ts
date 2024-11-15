// redux
import { courseSlice } from './slice';

// ----------------------------------------------------------------------

export const { successfulGetCourse, successfulGetPageCourses, successfulGetListOfCourses } =
  courseSlice.actions;
