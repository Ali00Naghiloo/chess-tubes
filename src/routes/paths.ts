// ----------------------------------------------------------------------

function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

function makeParams(params: Record<string, any>) {
  const paramsUrl = new URLSearchParams();
  Object.keys(params).forEach((q) => paramsUrl.append(q, params[q]));
  return paramsUrl.toString();
}

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login-signup'),
  verify: path(ROOTS_AUTH, '/verify'),
  loginViaCode: path(ROOTS_AUTH, '/login-via-code'),
  forgetPassword: path(ROOTS_AUTH, '/forget-password'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  resetPasswordVerify: path(ROOTS_AUTH, '/reset-password-verify'),
};

export const PATH_PAGE = {
  root: '/',

  avatarImageUrl: (fileName?: string) =>
    `http://storage.chesstubes.com/public/avatars/${fileName ?? 'user.png'}`,

  productImageUrl: (fileName?: string) =>
    `http://storage.chesstubes.com/public/productImages/${fileName ?? 'product.jpg'}`,

  // TODO MUST CHANGE IN FUTURE
  courseImageUrl: (fileName?: string) =>
    `http://storage.chesstubes.com/public/productImages/${fileName ?? 'product.jpg'}`,

  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faq',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  rules: '/rules',
  //
  courses: '/courses',
  shop: '/shop',
  liveAnalysis: '/live-analysis',
  onlineCourses: '/online-course',

  checkout: '/checkout',

  product: (id: string | number, params?: Record<string, any>) =>
    `/shop/${id}?${params ? makeParams(params) : ''}`,

  course: (id: string | number, params?: Record<string, any>) =>
    `/courses/${id}?${params ? makeParams(params) : ''}`,
  onlineCourse: (id: string | number, params?: Record<string, any>) =>
    `/online-course/${id}?${params ? makeParams(params) : ''}`,
  liveAnalyis: (id: string | number, params?: Record<string, any>) =>
    `/live-analysis/${id}?${params ? makeParams(params) : ''}`,

  news: {
    root: '/news',
    internalNews: path('/news', '/internal'),
    externalNews: path('/news', '/external'),

    internalNew: (id: number | string) => `/news/internal/${id}`,
    externalNew: (id: number | string) => `/news/external/${id}`,
  },

  newsImage: (fileName?: string) =>
    `http://storage.chesstubes.com/public/news/${fileName ?? 'news.jpg'}`,

  search: '/search',

  logout: '/logout',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  account: path(ROOTS_DASHBOARD, '/account'),

  orderPaymentStatus: (id: string | number, params?: Record<string, any>) =>
    path(ROOTS_DASHBOARD, `/orders/payment-status/${id}?${params ? makeParams(params) : ''}`),

  cart: path(ROOTS_DASHBOARD, '/cart'),
  orders: path(ROOTS_DASHBOARD, '/orders'),

  setting: path(ROOTS_DASHBOARD, '/setting'),

  order: (id: string | number, params?: Record<string, any>) =>
    path(ROOTS_DASHBOARD, `/orders/${id}?${params ? makeParams(params) : ''}`),

  myCourses: path(ROOTS_DASHBOARD, '/courses'),

  fav: path(ROOTS_DASHBOARD, '/fav'),
  banking: path(ROOTS_DASHBOARD, '/banking'),
  recently: path(ROOTS_DASHBOARD, '/recently'),
  qAndA: path(ROOTS_DASHBOARD, '/q&a'),
  addresses: path(ROOTS_DASHBOARD, '/addresses'),
  comments: path(ROOTS_DASHBOARD, '/comments'),
  managerMessages: path(ROOTS_DASHBOARD, '/messages'),

  newTicket: path(ROOTS_DASHBOARD, '/tickets/new'),
  tickets: path(ROOTS_DASHBOARD, '/tickets'),
  ticket: (ticketId: number | string) => path(ROOTS_DASHBOARD, `/tickets/${ticketId}`),
};
