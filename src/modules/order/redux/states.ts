import { Order, OrdersList } from '../models/order';

// ----------------------------------------------------------------------

export interface OrderState {
  order: Order;
  orders: {
    inprogress: Orders;
    completed: Orders;
    cancelled: Orders;
    returned: Orders;
  };
}

export interface Orders {
  data: OrdersList;
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
  };
}

const InitialOrders = {
  data: [],
  links: {
    first: '',
    last: '',
    prev: null,
    next: null,
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    path: '',
    per_page: 10,
    to: 1,
    total: 1,
  },
};

export const initialOrderState: OrderState = {
  order: {
    orderDate: '',
    orderDiscount: 0,
    orderId: 0,
    orderPrice: 0,
    shipment: {
      address: '',
      cost: 0,
      mobile: '',
      payType: '',
      postalCode: '',
      recipientName: '',
      shipping_title: '',
    },
    status: '',
    state: 'completed',
    orderItems: [],
  },
  orders: {
    cancelled: InitialOrders,
    completed: InitialOrders,
    inprogress: InitialOrders,
    returned: InitialOrders,
  },
};
