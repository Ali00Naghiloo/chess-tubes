export interface Cart {
  cartId: string | number;
  totalPrice: string | number;
  totalCount: string | number;
  totalDiscount: string | number;
  couponDiscount: string | number;
  cartItems: CartItem[];
}

export interface CartItem {
  itemId: string | number;
  itemType: 'product' | 'course';
  productId: string | number;
  Title: string;
  image: string;
  discount: string | number;
  price: string | number;
  quantity: string | number;
  messages?: string[];
}
