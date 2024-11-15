export type OrderTypes = 'pendingForPay' | 'delivered' | 'processing' | 'canceled';

type ItemProps = {
  id: string | number;
  src: string;
  name: string;
};

export type PendingForPayProps = {
  type: 'pending';
  date: Date;
  id: string;
  price: string;
  offPrice: string;
  items: ItemProps[];
  expireDate?: Date;
  deliveryDate: Date;
};

export type CanceledProps = {
  type: 'canceled';
  date: Date;
  id: string;
  price: string;
  offPrice: string;
  items: ItemProps[];
  deliveryDate: Date;
};

export type DeliveredProps = {
  type: 'delivered';
  date: Date;
  id: string;
  price: string;
  offPrice: string;
  items: ItemProps[];
  deliveryDate: Date;
};

export type ProcessingProps = {
  type: 'processing';
  date: Date;
  id: string;
  price: string;
  offPrice: string;
  items: ItemProps[];
  deliveryDate: Date;
  currentStep: string;
  nextStep: string;
};

export type OrderProps = PendingForPayProps | CanceledProps | DeliveredProps | ProcessingProps;
