import { Cart } from '../models/cart';

// ----------------------------------------------------------------------

export const initialCartState: Cart = {
  cartId: '',
  cartItems: [],
  couponDiscount: '',
  totalCount: 0,
  totalPrice: '',
  totalDiscount: 0,
};
