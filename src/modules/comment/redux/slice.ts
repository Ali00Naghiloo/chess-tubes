// redux
import { createSlice } from '@reduxjs/toolkit';
// states
import { initialCommentState } from './states';

// ----------------------------------------------------------------------

export const commentSlice = createSlice({
  name: 'comment',
  initialState: initialCommentState,
  reducers: {
    successfulGetComment(state, action) {
      state.commentSummary = action.payload.product;
      state.comments = action.payload.data;
      state.commentsLinks = action.payload.links;
    },

    successfulGetHaveComment(state, action) {
      state.haveComment = action.payload;
    },

    successfulLoadMoreComments(state, action) {
      state.commentSummary = action.payload.product;
      state.comments = [...state.comments, ...action.payload.data];
      state.commentsLinks = action.payload.links;
    },

    successfulGetHomeTestimonials(state, action) {
      state.homeTestimonials = action.payload;
    },

    successfulGetUserComments(state, action) {
      state.userComments.comments = action.payload.data;
      state.userComments.meta = action.payload.meta;
    },

    successfulGetWaitingForComments(state, action) {
      state.waitingForComments.items = action.payload.data;
      state.waitingForComments.meta = action.payload.meta;
    },
  },
});
