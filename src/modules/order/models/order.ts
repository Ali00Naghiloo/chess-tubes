export type Order = {
  orderId: number;
  orderDate: string;
  orderPrice: number;
  orderDiscount: number;
  status: string;
  orderExpire?: string | number;
  state: 'completed' | 'cancelled' | 'inProgress' | 'returned' | 'pending';
  shipment: {
    address: string;

    postalCode: string;
    recipientName: string;
    mobile: string;
    shipping_title: string;
    cost: number;
    payType: string;
    sendDate?: number;
    trackingCode?: string;
    trackingUrl?: string;
  };
  orderItems: OrderItem[];
};

export interface OrderItem {
  order_item_id: number;
  itemType: 'course' | 'product';
  sellingPrice: number;
  sellingDiscount: number;
  quantity: number;
  item_id: number;
  title: string;
  image: string;
}

export type OrdersList = OrdersListItem[];

export interface OrdersListItem {
  orderId: number;
  orderDate: string;
  price: number;
  discount: number;
  state: string;
  status: string;
  orderItems: OrdersListItemProduct[];
}

export interface OrdersListItemProduct {
  order_item_id: number;
  itemType: 'course' | 'product' | 'onlineTraining';
  sellingPrice: number;
  sellingDiscount: number;
  quantity: number;
  item_id: number;
  title: string;
  image: string;
}
