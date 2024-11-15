// ----------------------------------------------------------------------

import { News, NewsCard } from '../models/news';

export interface NewsState {
  news: News;
  externalNews: NewsCardWithPagination;
  internalNews: NewsCardWithPagination;
  pageNews: PageNews[];
}

export interface PageNews {
  id: number | string;
  slug: string;
  title: string;
  image: string;
  publishDate: string;
}

export interface NewsCardWithPagination {
  current_page: number | string;
  data: NewsCard[];
  first_page_url: string;
  from: number | string;
  last_page: number | string;
  last_page_url: string;
  links: any[];
  next_page_url: string;
  per_page: number | string;
  prev_page_url: string;
  to: number | string;
  total: number | string;
}

const EmptyNewsCard = {
  current_page: '',
  data: [],
  first_page_url: '',
  from: '',
  last_page: '',
  last_page_url: '',
  links: [],
  next_page_url: '',
  per_page: '',
  prev_page_url: '',
  to: '',
  total: '',
};

export const initialNewsState: NewsState = {
  news: {
    content: '',
    newsDate: '',
    newsId: '',
    newsImage: '',
    slug: '',
    title: '',
    lastNews: [],
    //
    discountedCourse: [],
  },
  externalNews: EmptyNewsCard,
  internalNews: EmptyNewsCard,
  pageNews: [],
};
