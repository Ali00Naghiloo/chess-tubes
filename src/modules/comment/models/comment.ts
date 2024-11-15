export interface Comment {
  id: string | number;
  productId: string | number;
  user?: string;
  rating: string | number;
  title: string;
  comment: string;
  recommend: 'recommended' | 'notSure' | 'notRecommend';
  sendDate: string | number;
  positiveIdea: string[];
  negativeIdea: string[];
  userReaction: {
    like: number | string;
    dislike: number | string;
  };
}

export interface CommentSummary {
  rate: string | number;
  commentCount: string | number;
  quality: {
    total: string | number;
    negative: string | number;
    positive: string | number;
  };
  buyingWorth: {
    total: string | number;
    negative: string | number;
    positive: string | number;
  };
}

export interface CommentsLinks {
  first?: string | null;
  last?: string | null;
  prev?: string | null;
  next?: string | null;
}

export interface UserComments {
  comments: UserCommentsItem[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface UserCommentsItem {
  commentId: number;
  rating: string;
  title: string | null;
  commentText: string;
  recommendState: 'recommended' | 'notSure' | 'notRecommend';
  positiveIdea: string[] | null; // TODO must be array not string!
  negativeIdea: string[] | null; // TODO must be array not string!
  userReaction: {
    like: number;
    dislike: number;
  };
  state: 'تائید شده' | 'در حال بررسی' | 'رد شده';
  sendDate: number | string;
  itemType: 'product' | 'course';
  itemData: UserCommentsItemItemData[];
}

export interface UserCommentsItemItemData {
  id: number;
  title: string;
  mainImage: string;
}

export interface WaitingForComments {
  items: WaitingForCommentsItem[];
  meta: {
    current_page: number;
    last_page: number;
  };
}

export interface WaitingForCommentsItem {}
