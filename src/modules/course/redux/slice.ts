// redux
import { createSlice } from '@reduxjs/toolkit';
// states
import { initialCourseState } from './states';

// ----------------------------------------------------------------------

export const courseSlice = createSlice({
  name: 'course',
  initialState: initialCourseState,
  reducers: {
    // SUCCESSFUL GET COURSE
    successfulGetCourse(state, action) {
      state.course = action.payload;
      state.content = action.payload.content;
    },

    // SUCCESSFUL GET PAGE COURSES
    successfulGetPageCourses(state, action) {
      state.pageCourses = action.payload;
    },

    // SUCCESSFUL GET LIST OF COURSES
    successfulGetListOfCourses(state, action) {
      state.courses = action.payload;
    },
  },
});
