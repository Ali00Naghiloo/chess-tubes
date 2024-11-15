// redux
import { commentSlice } from './slice';

// ----------------------------------------------------------------------

export const {
  successfulGetComment,
  successfulGetHaveComment,
  successfulLoadMoreComments,
  successfulGetHomeTestimonials,
  successfulGetUserComments,
  successfulGetWaitingForComments,
} = commentSlice.actions;
