type ItemProps = {
  id: string | number;
  src: string;
  name: string;
};

export type InProgressProps = {
  type: 'waitForPay' | 'preparing';
  date: Date;
  id: string;
  price: string;
  offPrice: string;
  items: ItemProps[];
  currentStep: string;
  nextStep: string;
  expireDate?: Date;
  deliveryDate: Date;
};

export type DeliveredProps = {
  date: Date;
  id: string;
  price: string;
  offPrice: string;
  items: ItemProps[];
  deliveryDate: Date;
};

export type CanceledProps = {
  type: 'system' | 'send' | 'user';
  date: Date;
  id: string;
  price: string;
  offPrice: string;
  items: ItemProps[];
  deliveryDate: Date;
};
