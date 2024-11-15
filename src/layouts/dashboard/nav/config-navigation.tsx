// components
import SvgColor from '@/components/svg-color';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  comment: icon('ic_message'),
  account: icon('ic_user'),
  orders: icon('ic_orders2'),
  courses: icon('ic_courses'),
  fav: icon('ic_fav'),
  banking: icon('ic_banking'),
  eye: icon('ic_eye'),
  cart: icon('ic_cart'),
  location: icon('ic_location'),
  managerMessage: icon('ic_communicate'),
  logout: icon('ic_logout'),
  qanda: icon('ic_question'),
  setting: icon('ic_setting'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { title: 'اطلاعات حساب کاربری', path: PATH_DASHBOARD.account, icon: ICONS.account },
      { title: 'سبد خرید', path: PATH_DASHBOARD.cart, icon: ICONS.cart },
      { title: 'تاریخچه سفارشات', path: PATH_DASHBOARD.orders, icon: ICONS.orders },
      { title: 'دوره های من', path: PATH_DASHBOARD.myCourses, icon: ICONS.courses },
      { title: 'علاقه مندی ها', path: PATH_DASHBOARD.fav, icon: ICONS.fav },
      { title: 'موجودی و تراکنش ها', path: PATH_DASHBOARD.banking, icon: ICONS.banking },
      { title: 'پشتیبانی و تیکت', path: PATH_DASHBOARD.tickets, icon: ICONS.managerMessage },
      { title: 'بازدید های اخیر', path: PATH_DASHBOARD.recently, icon: ICONS.eye },
      // { title: 'تنظیمات حساب', path: PATH_DASHBOARD.setting, icon: ICONS.setting },
      { title: 'پرسش و پاسخ ها', path: PATH_DASHBOARD.qAndA, icon: ICONS.qanda },
      { title: 'آدرس ها', path: PATH_DASHBOARD.addresses, icon: ICONS.location },
      { title: 'نظرات', path: PATH_DASHBOARD.comments, icon: ICONS.comment },
      // { title: 'پیام مدیریت', path: PATH_DASHBOARD.managerMessages, icon: ICONS.managerMessage },
      // { title: 'خروج از حساب کاربری', path: PATH_PAGE.logout, icon: ICONS.logout },
    ],
  },
];

export default navConfig;
