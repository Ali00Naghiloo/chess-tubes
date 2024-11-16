// types

import {
  Comment,
  CommentSummary,
  CommentsLinks,
  UserComments,
  WaitingForComments,
} from '../models/comment';

// ----------------------------------------------------------------------

export interface CommentState {
  comments: Comment[];
  commentSummary: CommentSummary;
  commentsLinks: CommentsLinks;
  homeTestimonials: HomeTestimonials[];
  haveComment: any;

  userComments: UserComments;
  waitingForComments: WaitingForComments;
}

export interface HomeTestimonials {
  id: string | number;
  comment: string;
  name: string;
  title: string;
  rating: string | number;
  image: string;
}

export const initialCommentState: CommentState = {
  comments: [],
  haveComment: [],
  commentSummary: {
    buyingWorth: { negative: '', positive: '', total: '' },
    commentCount: '',
    quality: { negative: '', positive: '', total: '' },
    rate: '',
  },
  commentsLinks: {},
  homeTestimonials: [],
  userComments: {
    comments: [],
    meta: {
      current_page: 0,
      from: 0,
      last_page: 0,
      per_page: 0,
      to: 0,
      total: 0,
    },
  },

  waitingForComments: {
    items: [],
    meta: { current_page: 0, last_page: 0 },
  },
};
