type strOrNum = string | number;

export interface Product {
  id: strOrNum;
  title: string;
  categoryId: strOrNum;
  category: string;
  description: string;
  rate: strOrNum;
  commentsCount: strOrNum;
  suggestionCount: strOrNum;
  recommendPercent: strOrNum;
  sellCount: strOrNum;
  price: strOrNum;
  discount: strOrNum;
  defaultImage?: string | null;
  images: ProductImage[];
  attributes: ProductAttribute;
  relatedProduct: ProductCardProps[];
}

export interface ProductCardProps {
  id: strOrNum;
  title: string;
  price: strOrNum;
  rating: strOrNum;
  mainImage: string;
  discount?: {
    product_id: strOrNum;
    discountPercent: strOrNum;
    start_date: strOrNum;
    end_date: strOrNum;
  };
}

export interface ProductImage {
  id: strOrNum;
  fileName: string;
  imageAlt: string;
}

export interface ProductAttribute {
  [name: string]: string;
}

export interface FavProduct {
  id: string | number;
  title: string;
  price: number;
  rating: number;
  mainImage: string;
  discount: string | number;
}

export interface PageProduct {
  id: string | number;
  title: string;
  price: number;
  rating: number;
  mainImage: string;
  discountPercent: string | number;
}
