// models
import { FavProduct, PageProduct, Product, ProductCardProps } from '../models/product';

// ----------------------------------------------------------------------

export interface ProductState {
  product: Product;
  similar: any[];
  favorites: FavProduct[];
  //
  pageProducts: PageProduct[];
  products: {
    current_page: number | string;
    data: ProductCardProps[];
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
  };
}

export const initialProductState: ProductState = {
  product: {
    attributes: {},
    category: '',
    categoryId: '',
    commentsCount: '',
    defaultImage: null,
    description: '',
    discount: '',
    id: '',
    images: [],
    price: '',
    rate: '',
    recommendPercent: '',
    sellCount: '',
    suggestionCount: '',
    title: '',
    relatedProduct: [],
  },
  similar: [],

  favorites: [],

  pageProducts: [],

  products: {
    current_page: 1,
    data: [],
    first_page_url: '',
    from: '',
    last_page: 1,
    last_page_url: '',
    links: [],
    next_page_url: '',
    per_page: '',
    prev_page_url: '',
    to: '',
    total: '',
  },
};
