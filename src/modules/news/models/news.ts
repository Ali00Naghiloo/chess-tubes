export interface News {
  newsId: string | number;
  title: string;
  slug: string;
  content: string;
  newsDate: string | number;
  newsImage: string;
  lastNews: NewsCard[];

  // *
  discountedCourse: [];
}

export interface NewsCard {
  id: string | number;
  title: string;
  slug: string;
  image: string;
  publishDate: string;
}
