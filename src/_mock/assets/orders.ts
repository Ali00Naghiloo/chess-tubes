import {
  CanceledProps,
  DeliveredProps,
  InProgressProps,
} from '@/sections/@dashboard/orders/tabs/types';

// ----------------------------------------------------------------------

export const INPROGRESS_ORDERS: InProgressProps[] = [
  {
    type: 'waitForPay',
    date: new Date(),
    id: '1234',
    price: '۶،۴۲۴،۰۰۰',
    offPrice: '۱۰۰،۰۰۰',
    items: [
      { id: 1, src: '/assets/images/covers/cover_2.jpg', name: 'h' },
      { id: 2, src: '/assets/images/covers/cover_1.jpg', name: 'h2' },
      { id: 3, src: '/assets/images/covers/cover_4.jpg', name: 'h3' },
    ],
    currentStep: '',
    nextStep: '',
    expireDate: new Date(),
    deliveryDate: new Date(),
  },
  {
    type: 'preparing',
    date: new Date(),
    id: '1235',
    price: '۶،۴۲۴،۰۰۰',
    offPrice: '۱۰۰،۰۰۰',
    items: [
      { id: 1, src: '/assets/images/covers/cover_5.jpg', name: 'h' },
      { id: 2, src: '/assets/images/covers/cover_3.jpg', name: 'h2' },
      { id: 3, src: '/assets/images/covers/cover_1.jpg', name: 'h3' },
    ],
    currentStep: 'در حال آماده سازی',
    nextStep: 'خروج از انبار',
    deliveryDate: new Date(),
  },
];

export const DELIVERED_ORDERS: DeliveredProps[] = [
  {
    date: new Date(),
    id: '1234',
    price: '۶،۴۲۴،۰۰۰',
    offPrice: '۱۰۰،۰۰۰',
    items: [
      { id: 1, src: '/assets/images/covers/cover_2.jpg', name: 'h' },
      { id: 2, src: '/assets/images/covers/cover_5.jpg', name: 'h2' },
      { id: 3, src: '/assets/images/covers/cover_6.jpg', name: 'h3' },
    ],
    deliveryDate: new Date(),
  },
  {
    date: new Date(),
    id: '1235',
    price: '۶،۴۲۴،۰۰۰',
    offPrice: '۱۰۰،۰۰۰',
    items: [
      { id: 1, src: '/assets/images/covers/cover_6.jpg', name: 'h' },
      { id: 2, src: '/assets/images/covers/cover_5.jpg', name: 'h2' },
      { id: 3, src: '/assets/images/covers/cover_1.jpg', name: 'h3' },
    ],
    deliveryDate: new Date(),
  },
];

export const CANCELED_ORDERS: CanceledProps[] = [
  {
    type: 'send',
    date: new Date(),
    id: '1234',
    price: '۶،۴۲۴،۰۰۰',
    offPrice: '۱۰۰،۰۰۰',
    items: [
      { id: 1, src: '/assets/images/covers/cover_3.jpg', name: 'h' },
      { id: 2, src: '/assets/images/covers/cover_5.jpg', name: 'h2' },
      { id: 3, src: '/assets/images/covers/cover_1.jpg', name: 'h3' },
    ],
    deliveryDate: new Date(),
  },
  {
    type: 'system',
    date: new Date(),
    id: '1235',
    price: '۶،۴۲۴،۰۰۰',
    offPrice: '۱۰۰،۰۰۰',
    items: [
      { id: 1, src: '/assets/images/covers/cover_2.jpg', name: 'h' },
      { id: 2, src: '/assets/images/covers/cover_6.jpg', name: 'h2' },
      { id: 3, src: '/assets/images/covers/cover_7.jpg', name: 'h3' },
    ],
    deliveryDate: new Date(),
  },
  {
    type: 'user',
    date: new Date(),
    id: '1235',
    price: '۶،۴۲۴،۰۰۰',
    offPrice: '۱۰۰،۰۰۰',
    items: [
      { id: 1, src: '/assets/images/covers/cover_5.jpg', name: 'h' },
      { id: 2, src: '/assets/images/covers/cover_1.jpg', name: 'h2' },
      { id: 3, src: '/assets/images/covers/cover_6.jpg', name: 'h3' },
    ],
    deliveryDate: new Date(),
  },
];
