import {
  CanceledProps,
  DeliveredProps,
  PendingForPayProps,
  ProcessingProps,
} from '@/sections/@dashboard/order/types';

// ----------------------------------------------------------------------

export const PROCESSING_ORDER: ProcessingProps = {
  type: 'processing',
  date: new Date(),
  id: '1234',
  price: '۶،۴۲۴،۰۰۰',
  offPrice: '۱۰۰،۰۰۰',
  items: [
    { id: 1, src: '/assets/images/covers/cover_2.jpg', name: 'h' },
    { id: 2, src: '/assets/images/covers/cover_1.jpg', name: 'h2' },
    { id: 3, src: '/assets/images/covers/cover_4.jpg', name: 'h3' },
  ],
  deliveryDate: new Date(),
  currentStep: 'درحال بررسی',
  nextStep: 'خروج از انبار',
};

// ----------------------------------------------------------------------

export const CANCELED_ORDER: CanceledProps = {
  type: 'canceled',
  date: new Date(),
  id: '1234',
  price: '۶،۴۲۴،۰۰۰',
  offPrice: '۱۰۰،۰۰۰',
  items: [
    { id: 1, src: '/assets/images/covers/cover_2.jpg', name: 'h' },
    { id: 2, src: '/assets/images/covers/cover_1.jpg', name: 'h2' },
    { id: 3, src: '/assets/images/covers/cover_4.jpg', name: 'h3' },
  ],
  deliveryDate: new Date(),
};

// ----------------------------------------------------------------------

export const PENDING_FOR_PAY_ORDER: PendingForPayProps = {
  type: 'pending',
  date: new Date(),
  id: '1234',
  price: '۶،۴۲۴،۰۰۰',
  offPrice: '۱۰۰،۰۰۰',
  items: [
    { id: 1, src: '/assets/images/covers/cover_2.jpg', name: 'h' },
    { id: 2, src: '/assets/images/covers/cover_1.jpg', name: 'h2' },
    { id: 3, src: '/assets/images/covers/cover_4.jpg', name: 'h3' },
  ],
  deliveryDate: new Date(),
  expireDate: new Date(),
};

// ----------------------------------------------------------------------

export const DELIVERED_ORDER: DeliveredProps = {
  type: 'delivered',
  date: new Date(),
  id: '1234',
  price: '۶،۴۲۴،۰۰۰',
  offPrice: '۱۰۰،۰۰۰',
  items: [
    { id: 1, src: '/assets/images/covers/cover_2.jpg', name: 'h' },
    { id: 2, src: '/assets/images/covers/cover_1.jpg', name: 'h2' },
    { id: 3, src: '/assets/images/covers/cover_4.jpg', name: 'h3' },
  ],
  deliveryDate: new Date(),
};
