// redux
import { combineReducers } from 'redux';
// slices
import { userSlice } from '@/modules/user/redux';
import { globalSlice } from '@/modules/global/redux/slice';
import { commentSlice } from '@/modules/comment/redux';
import { qAndASlice } from '@/modules/q&a/redux';
import { productSlice } from '@/modules/product/redux';
import { cartSlice } from '@/modules/cart/redux';
import { courseSlice } from '@/modules/course/redux';
import { newsSlice } from '@/modules/news/redux';
import { bannerSlice } from '@/modules/banner/redux';
import { orderSlice } from '@/modules/order/redux';
import { ticketSlice } from '@/modules/ticket/redux';
import { notificationSlice } from '@/modules/notification/redux';
import { walletTransactionsSlice } from '@/modules/wallet/redux';
import { faqTransactionsSlice } from '@/modules/faqs/redux';
import { contactTransactionsSlice } from '@/modules/contact/redux';
import { ruleSlice } from '@/modules/rules/redux';
import { aboutSlice } from '@/modules/about/redux';
import { onlineCourseSlice } from '@/modules/online-course/redux';
import { liveAnalysisSlice } from '@/modules/live-analysis/redux';

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  user: userSlice.reducer,
  global: globalSlice.reducer,
  comment: commentSlice.reducer,
  qAndA: qAndASlice.reducer,
  product: productSlice.reducer,
  cart: cartSlice.reducer,
  course: courseSlice.reducer,
  onlineCourse: onlineCourseSlice.reducer,
  liveAnalysis: liveAnalysisSlice.reducer,
  news: newsSlice.reducer,
  banner: bannerSlice.reducer,
  order: orderSlice.reducer,
  ticket: ticketSlice.reducer,
  notification: notificationSlice.reducer,
  walletTransactions: walletTransactionsSlice.reducer,
  faqs: faqTransactionsSlice.reducer,
  contact: contactTransactionsSlice.reducer,
  rules: ruleSlice.reducer,
  about: aboutSlice.reducer,
});

export default rootReducer;
